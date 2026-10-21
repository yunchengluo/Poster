<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { assets, researchCards, awards, awardImages, applicationCards } from './posterContent'

// Preserve the brochure's source wording; soft hyphens are only layout hints.
const plainBullet = bullet => typeof bullet === 'string' ? bullet : bullet.html.replace(/&shy;/g, '')
const researchAreas = [
  'Decentralized collaboration for quality, safety, and carbon engineering system',
  'Human-robot collaboration for robotic production system',
  'Collaborative robots for the assembly system',
  'Collaborative scheduling for production and maintenance system',
  'Multi-agent collaboration in complex adaptive system',
]
const themes = [
  { id: 'hku', label: 'HKU Green & Gold', color: '#004638', accent: '#be9b55' },
  { id: 'ivory', label: 'Ivory & Forest', color: '#305849', accent: '#ad894a' },
  { id: 'navy', label: 'Navy & Gold', color: '#18364b', accent: '#b59355' },
  { id: 'sage', label: 'Sage & Graphite', color: '#40564c', accent: '#839886' },
]
const savedTheme = (() => { try { return localStorage.getItem('ci3-poster-theme') } catch { return null } })()
const theme = ref(themes.some(item => item.id === savedTheme) ? savedTheme : 'hku')
const selectedTheme = computed(() => themes.find(item => item.id === theme.value))
const paletteOpen = ref(false)
const zoom = ref('fit')
const width = ref(typeof window === 'undefined' ? 1440 : window.innerWidth)
const scale = computed(() => zoom.value === 'actual' ? 1 : Math.min(1, Math.max(0.16, (width.value - (width.value < 700 ? 24 : 80)) / 1800)))
const frameStyle = computed(() => ({ width: `${1800 * scale.value}px`, height: `${2544.82759 * scale.value}px` }))
const posterStyle = computed(() => ({ transform: `scale(${scale.value})` }))
function setTheme(id) {
  theme.value = id
  paletteOpen.value = false
  try { localStorage.setItem('ci3-poster-theme', id) } catch { /* Optional preference storage. */ }
}
function handleResize() { width.value = window.innerWidth }
function printPoster() { window.print() }
function handleEscape(event) { if (event.key === 'Escape') paletteOpen.value = false }
onMounted(() => { window.addEventListener('resize', handleResize); window.addEventListener('keydown', handleEscape) })
onUnmounted(() => { window.removeEventListener('resize', handleResize); window.removeEventListener('keydown', handleEscape) })
</script>

<template>
  <div class="poster-app" :data-theme="theme">
    <header class="preview-toolbar">
      <div class="preview-brand"><strong>CI³ Lab</strong><span>Research Poster</span></div>
      <div class="preview-actions">
        <div class="palette-control">
          <button class="palette-toggle" type="button" :aria-expanded="paletteOpen" aria-controls="palette-options" @click="paletteOpen = !paletteOpen">
            <span class="swatch" :style="{ background: selectedTheme.color, borderColor: selectedTheme.accent }"></span>
            <span>{{ selectedTheme.label }}</span><span aria-hidden="true">⌄</span>
          </button>
          <div v-if="paletteOpen" id="palette-options" class="palette-options" role="group" aria-label="Poster colour palette">
            <button v-for="item in themes" :key="item.id" type="button" :aria-pressed="theme === item.id" @click="setTheme(item.id)">
              <span class="swatch" :style="{ background: item.color, borderColor: item.accent }"></span>
              {{ item.label }}<span class="selection-mark" aria-hidden="true">{{ theme === item.id ? '✓' : '' }}</span>
            </button>
          </div>
        </div>
        <button class="zoom-toggle" type="button" :aria-pressed="zoom === 'actual'" @click="zoom = zoom === 'fit' ? 'actual' : 'fit'">{{ zoom === 'fit' ? 'View at 100%' : 'Fit to screen' }}</button>
        <button class="print-button" type="button" @click="printPoster">Print / Save PDF</button>
      </div>
    </header>
    <div class="preview-meta"><span>A0 PORTRAIT <span class="meta-dot">·</span> 841 × 1189 mm</span><span aria-live="polite">{{ Math.round(scale * 100) }}% preview</span></div>
    <div class="poster-stage" :class="{ 'actual-size': zoom === 'actual' }">
      <div class="poster-frame" :style="frameStyle">
        <main class="research-poster" :style="posterStyle" lang="en">
          <header class="poster-header">
            <div class="hku-crest"><img :src="assets.hku" alt="The University of Hong Kong crest" /></div>
            <div class="header-copy">
              <h1>CI³ Lab <span>(Collaborative Intelligence with Construction Informatics in Construction Industrialization)</span></h1>
              <p><strong>Prof. Xiao Li</strong><span>Department of Civil Engineering at HKU</span></p>
            </div>
            <img class="lab-logo" :src="assets.labLogo" alt="CI³ Lab · Collaborative Intelligence" />
          </header>

          <div class="poster-columns">
            <div class="poster-left">
              <section class="poster-section vision-section" aria-labelledby="vision-title">
                <div class="section-heading"><span class="section-number">01</span><h2 id="vision-title">Vision &amp; Research Areas</h2></div>
                <div class="vision-statement"><h3>Vision</h3><p>To understand the evolution of collaboration behavior for complex construction systems.</p></div>
                <h3 class="areas-title">Research Areas</h3>
                <ul class="research-areas"><li v-for="area in researchAreas" :key="area">{{ area }}</li></ul>
              </section>

              <section class="poster-section awards-section" aria-labelledby="awards-title">
                <div class="section-heading"><span class="section-number">02</span><h2 id="awards-title">Honours &amp; Awards</h2><strong class="award-count">10+</strong></div>
                <div class="awards-body"><div class="awards-summary">
                  <figure class="geneva-award"><img :src="assets.certificateMain" alt="Gold Medal certificate from the International Exhibition of Inventions Geneva" /><figcaption><span>2024 Highlight</span><strong>Gold Medal, Geneva</strong></figcaption></figure>
                  <div class="awards-timeline"><div v-for="award in awards" :key="award[0]" class="award-row"><strong>{{ award[0] }}</strong><p>{{ award[1] }}</p></div></div>
                </div>
                <div class="poster-certificates"><figure v-for="(image, index) in awardImages" :key="image.src" :class="[image.layout, image.className]"><img :src="image.src" :alt="image.alt" /></figure></div></div>
              </section>

              <section class="poster-section research-section" aria-labelledby="research-title">
                <div class="section-heading"><span class="section-number">03</span><h2 id="research-title">Research &amp; Innovation</h2></div>
                <p class="research-intro">CI³ Lab develops centralized, distributed, and decentralized collaborative systems across robotics, scheduling, and knowledge.</p>
                <div class="poster-research-grid"><article v-for="card in researchCards" :key="card.no" :class="['poster-research-card', `research-card-${card.no}`]"><h3><span class="research-card-number">{{ card.no }}</span>{{ card.title }}</h3><figure><img :src="card.image" :alt="card.title" /></figure><p>{{ card.text }}</p><ul class="research-tags"><li v-for="tag in (card.tagRows?.flat() ?? card.tags)" :key="tag">{{ tag }}</li></ul></article></div>
                <p class="research-footnote">A technical foundation linking robotics, scheduling, distributed collaboration, and knowledge reasoning for industrialized construction.</p>
              </section>
            </div>

            <section class="poster-section impacts-section" aria-labelledby="impacts-title">
              <div class="section-heading"><span class="section-number">04</span><h2 id="impacts-title">Research impacts</h2></div>

              <article v-for="(card, index) in applicationCards.slice(0, 2)" :key="card.title" class="impact-entry" :class="card.className">
                <div class="impact-title"><span class="impact-index">{{ String(index + 1).padStart(2, '0') }}</span><div><h3>{{ card.title }}</h3><p>{{ card.en }}</p></div></div>
                <p class="impact-description">{{ card.text }}</p>
                <div class="impact-detail"><figure><img :src="card.image" :alt="card.caption" /><figcaption>{{ card.caption }}</figcaption></figure><ul><li v-for="bullet in card.bullets" :key="plainBullet(bullet)">{{ plainBullet(bullet) }}</li></ul></div>
              </article>

              <article class="impact-entry construction-entry">
                <div class="impact-title"><span class="impact-index">03</span><div><h3>Intelligent Construction</h3><p>Robotic Construction</p></div></div>
                <p class="impact-description">The Hybrid Pose Adjustment Robot (HyPA) addresses the challenges of accurate alignment, swing, perception in assembly of prefabricated modules, enabling 6-DoF pose control, wind-disturbance swing suppression, closed-loop digital twin optimization.</p>
                <div class="construction-images"><figure class="construction-photo"><img :src="assets.construction" alt="HyPA field application" /><figcaption>HyPA commissioning and deployment in modular building projects</figcaption></figure><div class="construction-insets"><figure><img :src="assets.hypa" alt="HyPA experimental platform" /><figcaption>HyPA lab-scale experimental platform</figcaption></figure><figure><img :src="assets.boltArm" alt="Suspended robotic-arm end-effector system" /><figcaption>Suspended robotic-arm end-effector operation system</figcaption></figure></div></div>
                <ul class="construction-features"><li>6-DOF pose control and wind-disturbance swing suppression</li><li>Vision foundation models + digital-twin closed-loop optimization</li><li>Scalable integration with suspended robotic-arm end-effectors</li></ul>
              </article>

              <article v-for="(card, index) in applicationCards.slice(2)" :key="card.title" class="impact-entry" :class="{ 'operation-entry': index === 0, 'policy-entry': index === 1 }">
                <div class="impact-title"><span class="impact-index">{{ String(index + 4).padStart(2, '0') }}</span><div><h3>{{ card.title }}</h3><p>{{ card.en }}</p></div></div>
                <p class="impact-description">{{ card.text }}</p>
                <div class="impact-detail"><figure><img :src="card.image" :alt="card.caption" /><figcaption>{{ card.caption }}</figcaption></figure><ul><li v-for="bullet in card.bullets" :key="plainBullet(bullet)">{{ plainBullet(bullet) }}</li></ul></div>
              </article>
            </section>
          </div>
          <footer class="poster-footer"><span>CI³ Lab</span><span>Department of Civil Engineering <b>·</b> The University of Hong Kong</span></footer>
        </main>
      </div>
    </div>
    <p class="preview-help">Choose a palette to compare colourways. Print uses the selected palette and the full A0 layout.</p>
  </div>
</template>
