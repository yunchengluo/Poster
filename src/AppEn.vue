<script setup>
import FontSwitcher from './FontSwitcher.vue'
import BrochureImage from './BrochureImage.vue'
import ImageVersionSwitcher from './ImageVersionSwitcher.vue'
import LayoutVersionSwitcher from './LayoutVersionSwitcher.vue'
import WhitespaceVersionSwitcher from './WhitespaceVersionSwitcher.vue'
import { useImageVersion } from './useImageVersion'
import { useLayoutVersion } from './useLayoutVersion'
import { useWhitespaceVersion } from './useWhitespaceVersion'

const assets = {
  hku: new URL('../assets/hku-logo-cropped.png', import.meta.url).href,
  labLogo: new URL('../assets/ci3lab-logo-green.png', import.meta.url).href,
  qr: new URL('../assets/image_06.png', import.meta.url).href,
  certificateMain: new URL('../assets/image_13.jpeg', import.meta.url).href,
  certificateA: new URL('../assets/image_14.jpeg', import.meta.url).href,
  certificateB: new URL('../assets/image_15.jpeg', import.meta.url).href,
  certificateC: new URL('../assets/image_16.jpeg', import.meta.url).href,
  certificateD: new URL('../assets/image_07.png', import.meta.url).href,
  certificateE: new URL('../assets/image_08.jpeg', import.meta.url).href,
  certificateF: new URL('../assets/image_09.jpeg', import.meta.url).href,
  certificateG: new URL('../assets/image_10.jpeg', import.meta.url).href,
  certificateH: new URL('../assets/image_11.jpeg', import.meta.url).href,
  certificateI: new URL('../assets/image_12.jpeg', import.meta.url).href,
  certificateJ: new URL('../assets/image_17.jpeg', import.meta.url).href,
  coverSite: new URL('../assets/图片 1.png', import.meta.url).href,
  robot: new URL('../assets/image_26.jpeg', import.meta.url).href,
  schedule: new URL('../assets/image_31.png', import.meta.url).href,
  distributed: new URL('../assets/image_32.png', import.meta.url).href,
  knowledge: new URL('../assets/image_01.png', import.meta.url).href,
  design: new URL('../assets/图片 2.png', import.meta.url).href,
  manufacturing: new URL('../assets/图片 3.png', import.meta.url).href,
  construction: new URL('../assets/image_22.png', import.meta.url).href,
  hypa: new URL('../assets/image_20.png', import.meta.url).href,
  boltArm: new URL('../assets/image_23.png', import.meta.url).href,
  operation: new URL('../assets/image_24.png', import.meta.url).href,
  policy: new URL('../assets/微信图片_20260618175921_10_82.png', import.meta.url).href,
}

const { showReplacements, imageSource, isReplacement, toggleImageVersion } = useImageVersion(assets)
const { showStandardLayout, toggleLayoutVersion, pageShell, previewStyle } = useLayoutVersion()
const { showExpandedWhitespace, toggleWhitespaceVersion } = useWhitespaceVersion()

const researchCards = [
  {
    no: '01',
    title: 'Collaborative Robotics',
    image: assets.robot,
    text: 'For complex construction environment, CI³ Lab develops robot for multiple tasks, e.g., lifting, inspection, measurement, dexterous manipulation etc.',
    tags: ['Assembly robot', 'Hopping robot', 'CDPRs', 'Dexterous hands', 'Aerial manipulators'],
    tagRows: [
      ['Assembly robot', 'Hopping robot'],
      ['Dexterous hands', 'CDPRs'],
      ['Aerial manipulators'],
    ],
  },
  {
    no: '02',
    title: 'Collaborative Scheduling',
    image: assets.schedule,
    text: 'LLMs are fine-tuned to parse unstructured scheduling demands. Reinforcement learning and graph neural networks are used for automatically modelling and robust rescheduling.',
    tags: ['LLM', 'RL', 'Dynamic decision-making', 'Heterogeneous GNNs'],
    tagRows: [
      ['RL', 'Dynamic decision-making'],
      ['LLM', 'Heterogeneous GNNs'],
    ],
  },
  {
    no: '03',
    title: 'Distributed Collaboration',
    image: assets.distributed,
    text: 'Novel federated learning, blockchain, IoT, and BIM systems are developed for privacy-preserving and distributed collaboration.',
    textHtml:
      '<span class="distributed-lead-tight">Novel federated learning, blockchain</span>, IoT, and BIM systems are developed for privacy-preserving and distributed collaboration.',
    tags: ['Federated learning', 'Blockchain', 'IoT', 'BIM'],
  },
  {
    no: '04',
    title: 'Knowledge Collaboration',
    image: assets.knowledge,
    text: 'Novel GraphRAG framework is developed for retrieval, reasoning, and decision support of complex engineering tasks.',
    tags: ['GraphRAG', 'Dynamic retrieval', 'KG', 'Multimodal documents'],
  },
]

const compactShortTags = new Set([
  'Assembly robot',
  'Hopping robot',
  'CDPRs',
  'Dexterous hands',
  'LLM',
  'RL',
  'Blockchain',
  'IoT',
  'BIM',
  'GraphRAG',
  'Dynamic retrieval',
  'KG',
])

const tightLetterTags = new Set([
  'Assembly robot',
  'Hopping robot',
])

const awards = [
  ['2024', 'Gold Medal, International Exhibition of Inventions Geneva'],
  ['2023', 'Huaxia Construction Science and Technology Award', 'timeline-huaxia-award'],
  ['2022', 'Construction Industry Council Innovation Award'],
  ['10+', 'Best Paper Awards and International Research Honors'],
]

const awardImages = [
  { src: assets.certificateF, layout: 'award-landscape', className: 'award-slot-top-left', alt: 'ICLS 2025 Best Paper Award' },
  { src: assets.certificateG, layout: 'award-landscape', className: 'award-impact-certificate award-slot-top-right', alt: 'Best Innovation and Impact Award' },
  { src: assets.certificateH, layout: 'award-portrait', className: 'award-slot-middle-left', alt: 'Best Conference Paper Second Prize' },
  { src: assets.certificateI, layout: 'award-portrait', className: 'award-slot-middle-center', alt: 'Best Presentation Award' },
  { src: assets.certificateJ, layout: 'award-portrait', className: 'award-slot-middle-right', alt: 'CIC Construction Innovation Award 2022' },
  { src: assets.certificateB, layout: 'award-small', className: 'award-stack-top', alt: 'Best Paper Award certificate' },
  { src: assets.certificateC, layout: 'award-small', className: 'award-stack-bottom', alt: 'Best Paper Award certificate' },
  { src: assets.certificateD, layout: 'award-small', className: 'award-slot-bottom-left', alt: 'WBC 2025 Best Paper Award' },
  { src: assets.certificateE, layout: 'award-small', className: 'award-slot-bottom-center', alt: 'ICCREM 2024 Best Paper Award' },
  { src: assets.certificateA, layout: 'award-small', className: 'award-china-wide', alt: 'Huaxia Construction Science and Technology Award certificate' },
]

const applicationCards = [
  {
    title: 'Intelligent Design',
    className: 'design-card',
    en: 'Design Intelligence',
    image: assets.design,
    fit: 'cover',
    caption: 'BIM Copilot interactive interface',
    text: 'Multimodal representations of CAD/BIM, point clouds, and drawings support retrieval-augmented generation, natural-language design interaction, and automatic model reconstruction.',
    bullets: ['CAD/BIM, point-cloud, and drawing representation', 'RAG-driven design knowledge retrieval', 'Natural-language interaction and BIM model generation'],
  },
  {
    title: 'Intelligent Manufacturing',
    className: 'manufacturing-card',
    en: 'Factory Digital Twins',
    image: assets.manufacturing,
    fit: 'cover',
    caption: 'Digital twin simulation for modular building factories',
    text: 'In factory production, a digital twin-enabled production scheduling system is developed for real-time monitoring, simulation, and dynamic optimization.',
    textClass: 'manufacturing-summary',
    bullets: ['TextSchedule: natural-language-driven production scheduling', '9,600+ entity knowledge graph for multi-hop reasoning', '9% improvement in production efficiency'],
  },
  {
    title: 'Intelligent Operation & Maintenance',
    en: 'Lifecycle Management',
    image: assets.operation,
    fit: 'contain',
    layout: 'horizontal',
    caption: 'Intelligent O&M framework for modular buildings',
    text: 'An integrated framework for reliability modeling, state sensing, and maintenance decision optimization supports long-term service-life management.',
    textClass: 'operation-summary',
    textHtml:
      'An integrated framework for reliability modeling, state sensing, and maintenance decision optimization supports <span class="operation-service-life">long-term service-life management.</span>',
    bullets: [
      'State perception',
      {
        html: 'Identifies structural/functional sub&shy;systems and soft/hard con&shy;straints',
        class: 'operation-bullet-tight',
      },
      {
        html: 'Online monitoring mainten&shy;ance strategies',
        class: 'operation-bullet-tight-02',
      },
      {
        html: 'Supports optimization of long-term hybrid maintenance strat&shy;egies',
        class: 'operation-bullet-tight-03',
      },
    ],
  },
  {
    title: 'Policy Simulation',
    en: 'Regional Collaboration',
    image: assets.policy,
    fit: 'cover',
    caption: 'Intelligent simulation system for cross-regional cooperation in the Greater Bay Area construction industry',
    text: 'A multi-agent cross-regional collaboration simulation platform supports dynamic evolution analysis and optimization under different policy scenarios.',
    bullets: ['Game theory captures micro-level agent interactions', 'AI agents model the evolution of cooperation', 'CGE models support macro-level policy analysis'],
  },
]
</script>

<template>
  <FontSwitcher />
  <ImageVersionSwitcher language="en" :show-replacements="showReplacements" @toggle="toggleImageVersion" />
  <LayoutVersionSwitcher language="en" :show-standard-layout="showStandardLayout" @toggle="toggleLayoutVersion" />
  <WhitespaceVersionSwitcher language="en" :show-expanded-whitespace="showExpandedWhitespace" @toggle="toggleWhitespaceVersion" />
  <main ref="pageShell" class="page-shell english-brochure" :class="{ 'layout-standard': showStandardLayout, 'whitespace-expanded': showExpandedWhitespace }" :style="previewStyle" lang="en">
    <section class="sheet-section">
      <div class="brochure-sheet outside-sheet">
        <article class="panel research-panel">
          <div class="panel-title">
            <h3>Research & Innovation</h3>
          </div>
          <p class="lead english-lead-tight" lang="en">
            CI³ Lab develops centralized, distributed, and decentralized collaborative systems across robotics, scheduling, and knowledge.
          </p>
          <div class="research-grid">
            <section v-for="card in researchCards" :key="card.no" class="research-card">
              <div class="card-head">
                <span>{{ card.no }}</span>
                <div>
                  <h4>{{ card.title }}</h4>
                  <p v-if="card.en">{{ card.en }}</p>
                </div>
              </div>
              <BrochureImage :natural-height="card.image === assets.knowledge" :replacement="isReplacement(card.image)" :src="imageSource(card.image)" :alt="card.title" />
              <p v-if="card.textHtml" v-html="card.textHtml"></p>
              <p v-else :class="card.textClass">{{ card.text }}</p>
              <div :class="['tag-row', 'compact-tag-row', { 'manual-tag-row': card.tagRows }]">
                <template v-if="card.tagRows">
                  <div v-for="(row, rowIndex) in card.tagRows" :key="rowIndex" class="tag-line">
                    <span
                      v-for="tag in row"
                      :key="tag"
                      :class="{
                        'compact-short-tag': compactShortTags.has(tag),
                        'tight-letter-tag': tightLetterTags.has(tag),
                      }"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </template>
                <template v-else>
                  <span
                    v-for="tag in card.tags"
                    :key="tag"
                    :class="{
                      'compact-short-tag': compactShortTags.has(tag),
                      'tight-letter-tag': tightLetterTags.has(tag),
                    }"
                  >
                    {{ tag }}
                  </span>
                </template>
              </div>
            </section>
          </div>
          <p class="footnote">
            A technical foundation linking robotics, scheduling, distributed collaboration, and knowledge reasoning for industrialized construction.
          </p>
        </article>

        <article class="panel honors-panel">
          <div class="panel-title split-title">
            <div>
              <h3>Honours & Awards</h3>
            </div>
            <strong>10+</strong>
          </div>
          <div class="award-hero">
            <img :src="assets.certificateMain" alt="Gold Medal certificate from the International Exhibition of Inventions Geneva" />
            <div>
              <span>2024 Highlight</span>
              <b>Gold Medal, Geneva</b>
            </div>
          </div>
          <div class="timeline">
            <div v-for="award in awards" :key="award[0] + award[1]" class="timeline-item">
              <span>{{ award[0] }}</span>
              <p :class="award[2]">{{ award[1] }}</p>
            </div>
          </div>
          <div class="certificate-wall">
            <figure
              v-for="image in awardImages"
              :key="image.src"
              :class="['certificate-item', image.layout, image.className]"
            >
              <img :src="image.src" :alt="image.alt" />
            </figure>
          </div>
        </article>

        <article class="panel cover-panel">
          <div class="cover-logos">
            <img class="cover-logo cover-logo-hku" :src="assets.hku" alt="The University of Hong Kong logo" />
            <img class="cover-logo cover-logo-ci3" :src="assets.labLogo" alt="CI3 Lab logo" />
          </div>
          <div class="cover-image">
            <img :src="assets.coverSite" alt="Construction industrialization site" />
          </div>
          <div class="cover-copy">
            <p class="eyebrow">Collaborative Intelligence</p>
            <h2>CI³ Lab</h2>
            <h3><span>Faculty of Engineering, HKU</span><strong>Collaborative Intelligence Lab</strong></h3>
            <p class="cover-description">
              CI³ Lab (Collaborative Intelligence with Construction Informatics in Construction Industrialization), founded<span class="cover-description-tight"> by Prof. Xiao Li in the Department of Civil Engineering at HKU, is an interdisciplinary team advancing collaborative intelligence for construction industrialization. The lab explores collaborative behavior and its evolution in complex construction environments, developing frontier methods in construction informatics, robotics, scheduling, distributed systems, and knowledge reasoning. Prof. Li is a Top 1% Scholar by Clarivate Analytics and World's Top 2% Scientists by Stanford University. He led a team with 40+ members and over HK$20 million projects, and received 10+ international awards. Through open research and interdisciplinary collaboration, CI³ Lab contributes academic insights and technologies for industrialized construction.</span>
            </p>
          </div>
          <div class="contact-card cover-contact-card">
            <div>
              <p>Faculty of Engineering, HKU<br />Collaborative Intelligence Lab (CI³ Lab)</p>
              <p class="cover-address-line">Address: 6/F, Haking Wong Building, HKU</p>
              <p>Email: Shell.x.li@hku.hk</p>
              <p>WeChat: CI³ Lab</p>
            </div>
            <img :src="assets.qr" alt="CI3 Lab QR code" />
          </div>
        </article>
      </div>
    </section>

    <section class="sheet-section">
      <div class="brochure-sheet inside-sheet">
        <div class="inside-header">
          <div>
            <p class="eyebrow">Construction Industrialization</p>
            <h3>Innovation Ecosystem</h3>
          </div>
          <div class="process-line">
            <span>Intelligent Design</span>
            <span>Intelligent Manufacturing</span>
            <span>Intelligent Construction</span>
            <span>Intelligent O&M</span>
            <span>Policy Simulation</span>
          </div>
        </div>

        <article class="panel application-column">
          <section v-for="card in applicationCards.slice(0, 2)" :key="card.title" :class="['app-card', 'primary-application-card', card.className]">
            <div class="app-title">
              <span></span>
              <div>
                <h4>{{ card.title }}</h4>
                <p>{{ card.en }}</p>
              </div>
            </div>
            <p v-if="card.textHtml" :class="card.textClass" v-html="card.textHtml"></p>
            <p v-else :class="card.textClass">{{ card.text }}</p>
            <figure class="app-figure">
              <BrochureImage :contain="card.fit === 'contain'" :replacement="isReplacement(card.image)" :src="imageSource(card.image)" :alt="card.caption" />
              <figcaption>{{ card.caption }}</figcaption>
            </figure>
            <ul>
              <li
                v-for="(bullet, bulletIndex) in card.bullets"
                :key="bulletIndex"
                :class="typeof bullet === 'object' ? bullet.class : undefined"
              >
                <span v-if="typeof bullet === 'object' && bullet.html" v-html="bullet.html"></span>
                <template v-else-if="typeof bullet === 'object'">{{ bullet.text }}</template>
                <template v-else>{{ bullet }}</template>
              </li>
            </ul>
          </section>
        </article>

        <article class="panel construction-panel">
          <div class="app-title main-app-title">
            <span></span>
            <div>
              <h4>Intelligent Construction</h4>
              <p>Robotic Construction</p>
            </div>
          </div>
          <p>
            The Hybrid Pose Adjustment Robot (HyPA) addresses the challenges of accurate alignment, swing, perception in assembly of prefabricated modules, enabling 6-DoF pose control, wind-disturbance swing suppression, closed-loop digital twin optimization.
          </p>
          <figure class="construction-main-figure">
            <BrochureImage class="construction-main" natural-height :replacement="isReplacement(assets.construction)" :src="imageSource(assets.construction)" alt="HyPA field application" />
            <figcaption>HyPA commissioning and deployment in modular building projects</figcaption>
          </figure>
          <div class="construction-thumbs">
            <figure>
              <img :src="imageSource(assets.hypa)" alt="HyPA experimental platform" />
              <figcaption>HyPA lab-scale experimental platform</figcaption>
            </figure>
            <figure>
              <img :src="assets.boltArm" alt="Suspended robotic-arm end-effector system" />
              <figcaption>Suspended robotic-arm end-effector operation system</figcaption>
            </figure>
          </div>
          <ul class="feature-list">
            <li class="construction-feature-1">6-DOF pose control and wind-disturbance swing suppression</li>
            <li class="construction-feature-2">Vision foundation models + digital-twin closed-loop optimization</li>
            <li class="construction-feature-3">Scalable integration with suspended robotic-arm end-effectors</li>
          </ul>
        </article>

        <article class="panel application-column">
          <section
            v-for="card in applicationCards.slice(2)"
            :key="card.title"
            :class="['app-card', { 'horizontal-card': card.layout === 'horizontal', 'policy-card': card.image === assets.policy }]"
          >
            <div class="app-title">
              <span></span>
              <div>
                <h4>{{ card.title }}</h4>
                <p>{{ card.en }}</p>
              </div>
            </div>
            <p v-if="card.textHtml" :class="card.textClass" v-html="card.textHtml"></p>
            <p v-else :class="card.textClass">{{ card.text }}</p>
            <figure class="app-figure">
              <BrochureImage :contain="card.fit === 'contain'" :replacement="isReplacement(card.image)" :src="imageSource(card.image)" :alt="card.caption" />
              <figcaption>{{ card.caption }}</figcaption>
            </figure>
            <ul>
              <li
                v-for="(bullet, bulletIndex) in card.bullets"
                :key="bulletIndex"
                :class="typeof bullet === 'object' ? bullet.class : undefined"
              >
                <span v-if="typeof bullet === 'object' && bullet.html" v-html="bullet.html"></span>
                <template v-else-if="typeof bullet === 'object'">{{ bullet.text }}</template>
                <template v-else>{{ bullet }}</template>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </section>
  </main>
</template>
