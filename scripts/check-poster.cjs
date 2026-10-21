const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const { chromium } = require('playwright')
const { PDFDocument } = require('pdf-lib')
const out = path.resolve(__dirname, '../exports')
fs.mkdirSync(out, { recursive: true })
async function main() {
  const browser = await chromium.launch({headless:true, ...(process.env.CHROME_EXECUTABLE ? {executablePath:process.env.CHROME_EXECUTABLE} : (process.platform === 'darwin' && fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome') ? {executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'} : {}))})
  try {
  const page = await browser.newPage({viewport:{width:1680,height:1100}})
  const errors = []
  page.on('pageerror', e => errors.push(e.message))
  const offline = process.argv.includes('--offline')
  const remoteRequests = []
  page.on('request', request => { if (/^https?:/.test(request.url())) remoteRequests.push(request.url()) })
  if (offline) await page.context().setOffline(true)
  const url = offline ? require('node:url').pathToFileURL(path.join(out,'CI3-Lab-Poster-Offline.html')).href : (process.env.POSTER_URL || 'http://localhost:5173/')
  await page.goto(url)
  await page.locator('main').waitFor({state:'visible',timeout:15000}).catch(error=>{ console.error('Page errors:',errors); throw error })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('main img').evaluateAll(imgs => Promise.all(imgs.map(i=>i.decode())))
  await page.screenshot({path:path.join(out,'preview-ui.png'),fullPage:true})
  const geometry = await page.evaluate(() => {
    const rect = element => { const r=element.getBoundingClientRect(); return {top:r.top,bottom:r.bottom,height:r.height,width:r.width,scrollHeight:element.scrollHeight,clientHeight:element.clientHeight} }
    return {poster:rect(document.querySelector('main')), columns:[...document.querySelectorAll('.poster-columns > *')].map(rect),sections:[...document.querySelectorAll('.poster-section')].map(e=>({title:e.querySelector('h2').innerText,...rect(e)})), entries:[...document.querySelectorAll('.impact-entry')].map(e=>({title:e.querySelector('h3').innerText,...rect(e)})), footer:rect(document.querySelector('.poster-footer')),images:[...document.querySelectorAll('main img')].map(i=>({alt:i.alt,loaded:i.complete&&i.naturalWidth>0}))}
  })
  fs.writeFileSync(path.join(out,'layout-report.json'),JSON.stringify(geometry,null,2))
  console.log('Layout:', geometry.sections.map(s => ({title:s.title,height:s.height,overflow:s.scrollHeight-s.clientHeight})))
  for (const section of geometry.sections) assert.ok(section.scrollHeight <= section.clientHeight+1,`Overflow: ${section.title}`)
  assert.equal(geometry.images.length,24)
  assert.ok(geometry.images.every(i=>i.loaded))
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('DOM.enable')
  await cdp.send('CSS.enable')
  const doc = await cdp.send('DOM.getDocument')
  const fontAudit = []
  for (const selector of ['h1','.vision-statement p','.poster-research-card > p','.impact-title h3','.award-row p']) {
    const {nodeId} = await cdp.send('DOM.querySelector',{nodeId:doc.root.nodeId,selector})
    const {fonts} = await cdp.send('CSS.getPlatformFontsForNode',{nodeId})
    assert.ok(fonts.length && fonts.every(f=>/Baskerville/.test(f.familyName)),`Unexpected rendered font in ${selector}`)
    fontAudit.push({selector,fonts})
  }
  fs.writeFileSync(path.join(out,'font-report.json'),JSON.stringify(fontAudit,null,2))
  const aligned = await page.locator('.poster-research-card figure').evaluateAll(items=>items.map(i=>{const r=i.getBoundingClientRect();return {top:r.top,bottom:r.bottom,width:r.width,height:r.height}}))
  for (const [a,b] of [[0,1],[2,3]]) {
    assert.ok(Math.abs(aligned[a].top-aligned[b].top)<1 && Math.abs(aligned[a].bottom-aligned[b].bottom)<1,'Research image row is not aligned')
    assert.ok(Math.abs(aligned[a].width-aligned[b].width)<1,'Research image widths differ')
  }
  const baseline = await page.locator('main').innerText()
  for (const [label,id] of [['HKU Green & Gold','hku'],['Ivory & Forest','ivory'],['Navy & Gold','navy'],['Sage & Graphite','sage']]) {
    await page.locator('.palette-toggle').click()
    await page.getByRole('button',{name:label,exact:false}).last().click()
    assert.equal(await page.locator('.poster-app').getAttribute('data-theme'),id)
    assert.equal(await page.locator('main').innerText(),baseline)
    await page.reload()
    assert.equal(await page.locator('.poster-app').getAttribute('data-theme'),id)
  }
  await page.locator('.palette-toggle').click()
  await page.getByRole('button',{name:'HKU Green & Gold',exact:false}).last().click()
  for (const width of [390,768,1440]) {
    await page.setViewportSize({width,height:1000})
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Page overflow')
  }
  await page.emulateMedia({media:'print'})
  await page.locator('main img').evaluateAll(imgs => Promise.all(imgs.map(i=>i.decode())))
  const bytes = await page.pdf({preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false})
  const pdf = await PDFDocument.load(bytes)
  console.log('PDF pages:',pdf.getPageCount(),pdf.getPages().map(p=>p.getSize()))
  fs.writeFileSync(path.join(out,'CI3-Lab-Research-Poster-A0.pdf'),bytes)
  assert.equal(pdf.getPageCount(),1,'Poster must print on one A0 page')
  assert.deepEqual(errors,[])
  if (offline) assert.deepEqual(remoteRequests,[], 'Offline poster made external requests')
  console.log('PASS: 24 images, actual Baskerville rendering, aligned research images, four palettes, text unchanged, persistence, responsive preview, one-page A0 PDF.')
  } finally { await browser.close() }
}
main().catch(error=>{console.error(error);process.exitCode=1})
