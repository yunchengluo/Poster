const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const playwright = require('playwright')
const { PDFDocument } = require('pdf-lib')

const root = path.resolve(__dirname, '..')
const qaDir = path.join(root, 'tmp/pdfs')
const outputDir = path.resolve(process.env.BROCHURE_OUTPUT_DIR || path.join(root, 'output/pdf'))
const baseURL = process.env.BROCHURE_URL || 'http://localhost:5173/'
const auditOnly = process.argv.includes('--audit-only')
const chrome = process.env.CHROME_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const height = 1200 * 210 / 297

async function ready(page) {
  await page.evaluate(() => document.fonts.ready)
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())))
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
}

async function geometry(page) {
  return page.locator('.brochure-sheet').evaluateAll(sheets => sheets.map(sheet => {
    const bounds = sheet.getBoundingClientRect()
    const clipping = []
    const walker = document.createTreeWalker(sheet, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const text = walker.currentNode
      if (!text.textContent.trim()) continue
      const range = document.createRange()
      range.selectNodeContents(text)
      for (const rect of range.getClientRects()) {
        let ancestor = text.parentElement
        while (ancestor && sheet.contains(ancestor)) {
          const style = getComputedStyle(ancestor)
          const clipX = ['hidden', 'clip'].includes(style.overflowX)
          const clipY = ['hidden', 'clip'].includes(style.overflowY)
          if (clipX || clipY) {
            const box = ancestor.getBoundingClientRect()
            if ((clipX && (rect.left < box.left - 1 || rect.right > box.right + 1)) ||
                (clipY && (rect.top < box.top - 1 || rect.bottom > box.bottom + 1))) {
              clipping.push({ text: text.textContent.trim(), ancestor: ancestor.className })
              break
            }
          }
          ancestor = ancestor.parentElement
        }
      }
    }
    return {
      width: bounds.width,
      height: bounds.height,
      panels: [...sheet.querySelectorAll(':scope > .panel')].map(panel => {
        const lastContent = panel.classList.contains('application-column')
          ? panel.querySelector('.app-card:last-child ul')
          : panel.lastElementChild
        const contentFrame = lastContent.closest('.app-card') || panel
        const scale = bounds.width / sheet.offsetWidth
        return {
          width: panel.getBoundingClientRect().width,
          height: panel.getBoundingClientRect().height,
          contentHeight: panel.scrollHeight,
          clientHeight: panel.clientHeight,
          contentBottom: lastContent.getBoundingClientRect().bottom - bounds.top,
          bottomGap: bounds.bottom - lastContent.getBoundingClientRect().bottom,
          frameBottomGap: contentFrame.getBoundingClientRect().bottom - lastContent.getBoundingClientRect().bottom - parseFloat(getComputedStyle(contentFrame).borderBottomWidth) * scale,
          sheetEdgeGap: bounds.bottom - panel.getBoundingClientRect().bottom,
        }
      }),
      cards: [...sheet.querySelectorAll('.app-card')].map(card => ({
        contentHeight: card.scrollHeight,
        clientHeight: card.clientHeight,
      })),
      primaryImages: [...sheet.querySelectorAll('.primary-application-card .app-figure img')].map(image => {
        const frame = image.closest('.image-width-frame') || image
        const imageStyle = getComputedStyle(image)
        const frameStyle = getComputedStyle(frame)
        const contentWidth = style => parseFloat(style.width) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth) - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
        const contentHeight = style => parseFloat(style.height) - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
        return {
          kind: image.closest('.design-card') ? 'design' : 'manufacturing',
          objectFit: imageStyle.objectFit,
          objectPosition: imageStyle.objectPosition,
          frameWidth: contentWidth(frameStyle),
          frameHeight: contentHeight(frameStyle),
          imageWidth: contentWidth(imageStyle),
          imageHeight: contentHeight(imageStyle),
          naturalRatio: image.naturalWidth / image.naturalHeight,
        }
      }),
      constructionImageHeight: sheet.querySelector('.construction-main')
        ? parseFloat(getComputedStyle(sheet.querySelector('.construction-main')).height)
        : null,
      operationCardHeight: sheet.querySelector('.horizontal-card')
        ? parseFloat(getComputedStyle(sheet.querySelector('.horizontal-card')).height)
        : null,
      clipping,
    }
  }))
}

async function main() {
  fs.mkdirSync(qaDir, { recursive: true })
  fs.mkdirSync(outputDir, { recursive: true })
  const browser = await playwright.chromium.launch({
    headless: true,
    ...(fs.existsSync(chrome) ? { executablePath: chrome } : {}),
  })
  const errors = []
  const report = []
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    page.on('pageerror', error => errors.push(error.message))

    for (const language of ['zh', 'en']) {
      const url = new URL(language === 'en' ? 'english.html' : '', baseURL).href
      for (const font of ['baskerville']) {
        for (const images of ['after', 'before']) {
          await page.goto(url)
          await page.evaluate(({ font, images }) => {
            localStorage.setItem('brochure-font-family', font)
            localStorage.setItem('brochure-image-version', images)
            localStorage.setItem('brochure-layout-version', 'after')
            localStorage.setItem('brochure-whitespace-version', 'after')
          }, { font, images })
          await page.reload()
          await ready(page)
          const after = await geometry(page)
          assert.equal(after.length, 2, 'Each brochure must have two sheets')
          for (const sheet of after) {
            assert.ok(Math.abs(sheet.width - 1200) < 0.1)
            assert.ok(Math.abs(sheet.height - height) < 0.1)
            assert.deepEqual(sheet.clipping, [], `Clipped text in ${language}/${font}/${images}`)
            for (const panel of sheet.panels) {
              assert.ok(panel.contentHeight <= panel.clientHeight + 1, `Panel overflow in ${language}/${font}/${images}`)
            }
            const bottoms = sheet.panels.map(panel => panel.contentBottom)
            assert.ok(Math.max(...bottoms) - Math.min(...bottoms) < 0.1, `Uneven content baseline in ${language}/${font}/${images}`)
            for (const card of sheet.cards) {
              assert.ok(card.contentHeight <= card.clientHeight + 1, `Card overflow in ${language}/${font}/${images}`)
            }
            for (const image of sheet.primaryImages) {
              assert.ok(Math.abs(image.imageWidth - image.frameWidth) < 0.1, 'Primary application image does not fill the frame width')
              if (image.kind === 'design') {
                assert.ok(Math.abs(image.imageWidth / image.imageHeight - image.naturalRatio) < 0.001, 'Design image is cropped')
              } else {
                assert.equal(image.objectFit, 'cover')
                assert.equal(image.objectPosition, '50% 100%', 'Manufacturing image should retain its lower portion')
                assert.ok(image.frameHeight > 100, 'Manufacturing frame is too short')
              }
            }
            if (sheet.constructionImageHeight !== null) {
              assert.ok(sheet.constructionImageHeight > 240, 'Construction main image did not increase in height')
              const originalOperationHeight = language === 'zh' ? 276.8125 : 291
              assert.ok(sheet.operationCardHeight / originalOperationHeight > 1.08)
              assert.ok(sheet.operationCardHeight / originalOperationHeight < 1.12)
            }
          }

          const copy = await page.locator('main').innerText()
          await page.locator('.whitespace-version-switcher').click()
          await ready(page)
          assert.equal(await page.locator('.whitespace-expanded').count(), 0)
          assert.equal(await page.locator('.whitespace-version-switcher').getAttribute('aria-pressed'), 'false')
          assert.equal(await page.locator('main').innerText(), copy, 'Switching whitespace changed brochure content')
          const whitespaceBefore = await geometry(page)
          for (let i = 0; i < after.length; i++) {
            assert.ok(Math.abs(whitespaceBefore[i].width - after[i].width) < 0.1)
            assert.ok(Math.abs(whitespaceBefore[i].height - after[i].height) < 0.1)
            assert.deepEqual(whitespaceBefore[i].clipping, [])
            for (let p = 0; p < after[i].panels.length; p++) {
              assert.ok(Math.abs(after[i].panels[p].frameBottomGap / whitespaceBefore[i].panels[p].frameBottomGap - 1.5) < 0.001, 'Spacing inside the content frame did not increase by 1.5 times')
              assert.ok(Math.abs(after[i].panels[p].sheetEdgeGap - whitespaceBefore[i].panels[p].sheetEdgeGap) < 0.1, 'Spacing between the sheet edge and panel changed')
            }
          }
          await page.reload()
          await ready(page)
          assert.equal(await page.locator('.whitespace-expanded').count(), 0, 'Whitespace selection was not persisted')
          await page.locator('.whitespace-version-switcher').click()
          await ready(page)
          assert.equal(await page.locator('.whitespace-version-switcher').getAttribute('aria-pressed'), 'true')
          assert.equal(await page.evaluate(() => localStorage.getItem('brochure-layout-version')), 'after')
          assert.equal(await page.evaluate(() => localStorage.getItem('brochure-font-family')), font)
          assert.equal(await page.evaluate(() => localStorage.getItem('brochure-image-version')), images)
          await page.locator('.layout-version-switcher').click()
          await ready(page)
          assert.equal(await page.locator('.layout-standard').count(), 0)
          assert.equal(await page.locator('main').innerText(), copy, 'Switching layout changed brochure content')
          const before = await geometry(page)
          for (let i = 0; i < before.length; i++) {
            for (let p = 0; p < before[i].panels.length; p++) {
              assert.ok(Math.abs(before[i].panels[p].width - after[i].panels[p].width) < 0.1, 'Panel width changed')
            }
          }
          await page.reload()
          await ready(page)
          assert.equal(await page.locator('.layout-standard').count(), 0, 'Before selection was not persisted')
          await page.locator('.layout-version-switcher').click()
          await ready(page)
          assert.equal(await page.locator('.layout-standard').count(), 1)
          assert.equal(await page.evaluate(() => localStorage.getItem('brochure-font-family')), font)
          assert.equal(await page.evaluate(() => localStorage.getItem('brochure-image-version')), images)
          report.push({ language, font, images, before, whitespaceBefore, after })
        }
      }

      // Responsive preview scales the original canvas without changing line breaks.
      await page.evaluate(() => {
        localStorage.setItem('brochure-font-family', 'baskerville')
        localStorage.setItem('brochure-image-version', 'after')
        localStorage.setItem('brochure-whitespace-version', 'after')
      })
      await page.reload()
      await ready(page)
      for (const width of [1100, 768, 390]) {
        await page.setViewportSize({ width, height: 1000 })
        await ready(page)
        const small = await geometry(page)
        for (const sheet of small) {
          assert.ok(Math.abs(sheet.width / sheet.height - 297 / 210) < 0.001)
          assert.deepEqual(sheet.clipping, [])
        }
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Horizontal page overflow')
      }
      await page.setViewportSize({ width: 1440, height: 1000 })
      await ready(page)
      await page.screenshot({ path: path.join(qaDir, `${language}-after.png`), fullPage: true })
      await page.locator('.layout-version-switcher').click()
      await ready(page)
      await page.screenshot({ path: path.join(qaDir, `${language}-before.png`), fullPage: true })
      await page.locator('.layout-version-switcher').click()
      await ready(page)

      await page.emulateMedia({ media: 'print' })
      await ready(page)
      const printed = await geometry(page)
      for (const sheet of printed) {
        assert.ok(Math.abs(sheet.width * 25.4 / 96 - 297) < 0.05)
        assert.ok(Math.abs(sheet.height * 25.4 / 96 - 210) < 0.05)
        assert.deepEqual(sheet.clipping, [])
        const bottoms = sheet.panels.map(panel => panel.contentBottom)
        assert.ok(Math.max(...bottoms) - Math.min(...bottoms) < 0.1, `Uneven printed content baseline in ${language}`)
        for (const card of sheet.cards) {
          assert.ok(card.contentHeight <= card.clientHeight + 1, `Printed card overflow in ${language}`)
        }
      }
      assert.equal(await page.locator('.layout-version-switcher').isVisible(), false)
      assert.equal(await page.locator('.whitespace-version-switcher').isVisible(), false)
      assert.equal(await page.locator('.image-version-switcher').isVisible(), false)
      assert.equal(await page.locator('.font-switcher').isVisible(), false)
      if (!auditOnly) {
        const file = language === 'zh' ? 'CI³ Lab 中文三折页 A4.pdf' : 'CI³ Lab English Brochure A4.pdf'
        const bytes = await page.pdf({
          preferCSSPageSize: true,
          printBackground: true,
          displayHeaderFooter: false,
          tagged: true,
        })
        // Chromium rounds the paper box to a fraction of a point. Restore exact
        // ISO A4 dimensions, keeping all text/images at their printed scale.
        const pdf = await PDFDocument.load(bytes, { updateMetadata: false })
        assert.equal(pdf.getPageCount(), 2, 'The printed PDF must have exactly two pages')
        for (const sheet of pdf.getPages()) {
          const a4Width = 297 * 72 / 25.4
          const a4Height = 210 * 72 / 25.4
          sheet.translateContent(0, a4Height - sheet.getHeight())
          sheet.setMediaBox(0, 0, a4Width, a4Height)
          sheet.setCropBox(0, 0, a4Width, a4Height)
        }
        fs.writeFileSync(path.join(outputDir, file), await pdf.save())
        console.log(`Exported ${file}`)
      }
      await page.emulateMedia({ media: 'screen' })
    }
    assert.deepEqual(errors, [], 'Browser errors occurred')
    fs.writeFileSync(path.join(qaDir, 'layout-checks.json'), JSON.stringify(report, null, 2))
    console.log(`Passed ${report.length} language/Baskerville/image combinations, bottom spacing comparison, full-width design/manufacturing images, larger construction/O&M cards, toggles, persistence, responsive preview, and print geometry.`)
  } finally {
    await browser.close()
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
