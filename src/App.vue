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
    title: '协作机器人',
    en: 'Collaborative Robotics',
    image: assets.robot,
    text: '面向复杂建造环境，研发多形态协作机器人，实现吊装、巡检、测量、灵巧操作、与高空作业等',
    tags: ['吊装机器人', '绳驱并联机器人', '跳跃机器人', '飞行机械臂', '灵巧手'],
  },
  {
    no: '02',
    title: '协同调度',
    en: 'Collaborative Scheduling',
    image: assets.schedule,
    text: '利用微调LLM解析非结构化需求，结合强化学习与图神经网络，实现自动建模和抗扰动重排产',
    tags: ['LLM', 'RL', '异构图神经网络', '动态决策'],
  },
  {
    no: '03',
    title: '分布式协作',
    en: 'Distributed Collaboration',
    image: assets.distributed,
    text: '结合联邦学习、区块链、物联网和 BIM，实现隐私保护与分布式协同管理。',
    tags: ['联邦学习', '区块链', 'IoT', 'BIM'],
  },
  {
    no: '04',
    title: '知识协同',
    en: 'Knowledge Collaboration',
    image: assets.knowledge,
    text: '构建以知识图谱为核心的 GraphRAG 框架，支持复杂工程问题检索、推理与决策。',
    tags: ['GraphRAG', '知识图谱', '多模态文档', '动态检索'],
  },
]

const awards = [
  ['2024', '日内瓦国际发明展金奖'],
  ['2023', '华夏建设科学技术二等奖'],
  ['2022', '香港建造业议会创新奖'],
  ['10+', '最佳论文奖及国际科研奖项'],
]

const awardImages = [
  { src: assets.certificateF, layout: 'award-landscape', className: 'award-slot-top-left', alt: 'ICLS 2025 Best Paper Award' },
  { src: assets.certificateG, layout: 'award-landscape', className: 'award-impact-certificate award-slot-top-right', alt: 'Best Innovation and Impact Award' },
  { src: assets.certificateH, layout: 'award-portrait', className: 'award-slot-middle-left', alt: 'Best Conference Paper Second Prize' },
  { src: assets.certificateI, layout: 'award-portrait', className: 'award-slot-middle-center', alt: 'Best Presentation Award' },
  { src: assets.certificateJ, layout: 'award-portrait', className: 'award-slot-middle-right', alt: 'CIC Construction Innovation Award 2022' },
  { src: assets.certificateB, layout: 'award-small', className: 'award-stack-top', alt: '最佳论文奖证书' },
  { src: assets.certificateC, layout: 'award-small', className: 'award-stack-bottom', alt: '最佳论文奖证书' },
  { src: assets.certificateD, layout: 'award-small', className: 'award-slot-bottom-left', alt: 'WBC 2025 Best Paper Award' },
  { src: assets.certificateE, layout: 'award-small', className: 'award-slot-bottom-center', alt: 'ICCREM 2024 Best Paper Award' },
  { src: assets.certificateA, layout: 'award-small', className: 'award-china-wide', alt: '华夏建设科学技术奖证书' },
]

const applicationCards = [
  {
    title: '智能设计',
    className: 'design-card',
    en: 'Intelligent Design',
    image: assets.design,
    fit: 'cover',
    caption: 'BIM Copilot 交互界面',
    text: '构建 CAD/BIM、点云、图纸等多模态设计数据表征，支持检索增强生成、自然语言设计交互与模型自动重建。',
    bullets: ['CAD/BIM/点云/图纸多模态表征', 'RAG 驱动的设计知识检索', '自然语言交互与 BIM 模型生成'],
  },
  {
    title: '智能制造',
    className: 'manufacturing-card',
    en: 'Intelligent Manufacturing',
    image: assets.manufacturing,
    fit: 'cover',
    caption: '模块化建筑工厂数字孪生仿真场景',
    text: '面向模块化建筑工厂化制造，构建数字孪生智能调度系统，实现实时监测、虚拟试错与动态优化。',
    bullets: ['TextSchedule：自然语言驱动排产', '9600+ 实体知识图谱支撑多跳推理', '生产效能提升 9%'],
  },
  {
    title: '智能运维',
    en: 'Intelligent Operation & Maintenance',
    image: assets.operation,
    fit: 'contain',
    layout: 'horizontal',
    caption: '模块化建筑智能运维框架',
    text: '构建“可靠性建模 - 状态感知 - 维护决策优化”一体化框架，支撑长期服役过程管理。',
    bullets: ['区分结构/功能子系统与软/硬失效', '整合基于建筑龄期、巡检状态与持续在线监测的维护策略', '支持长期混合检修策略优化'],
  },
  {
    title: '政策仿真',
    en: 'Policy Simulation',
    image: assets.policy,
    fit: 'cover',
    caption: '大湾区建筑业跨区域合作智能仿真系统',
    text: '搭建多主体跨区域合作智能仿真平台，支持不同政策情景下的动态演化分析与优化。',
    bullets: ['博弈论刻画微观主体交互', 'AI Agent 建模合作演化过程', 'CGE 模型支撑宏观政策分析'],
  },
]
</script>

<template>
  <FontSwitcher />
  <ImageVersionSwitcher :show-replacements="showReplacements" @toggle="toggleImageVersion" />
  <LayoutVersionSwitcher :show-standard-layout="showStandardLayout" @toggle="toggleLayoutVersion" />
  <WhitespaceVersionSwitcher :show-expanded-whitespace="showExpandedWhitespace" @toggle="toggleWhitespaceVersion" />
  <main ref="pageShell" class="page-shell" :class="{ 'layout-standard': showStandardLayout, 'whitespace-expanded': showExpandedWhitespace }" :style="previewStyle">
    <section class="sheet-section">
      <div class="brochure-sheet outside-sheet">
        <article class="panel research-panel">
          <div class="panel-title">
            <p>Research & Innovation</p>
            <h3>研究与创新</h3>
          </div>
          <p class="lead">
            面向建筑工业化场景，CI³ Lab围绕机器人本体、调度、知识等方向系统性地研发中心化、分布式、去中心化的协作系统
          </p>
          <div class="research-grid">
            <section v-for="card in researchCards" :key="card.no" class="research-card">
              <div class="card-head">
                <span>{{ card.no }}</span>
                <div>
                  <h4>{{ card.title }}</h4>
                  <p>{{ card.en }}</p>
                </div>
              </div>
              <BrochureImage :natural-height="card.image === assets.knowledge" :replacement="isReplacement(card.image)" :src="imageSource(card.image)" :alt="card.title" />
              <p>{{ card.text }}</p>
              <div class="tag-row">
                <span v-for="tag in card.tags" :key="tag">{{ tag }}</span>
              </div>
            </section>
          </div>
          <p class="footnote">
            从机器人感知与作业，到调度优化、分布式协作与知识推理，构建面向建筑工业化的技术底座。
          </p>
        </article>

        <article class="panel honors-panel">
          <div class="panel-title split-title">
            <div>
              <p>Honours & Awards</p>
              <h3>荣誉与奖项</h3>
            </div>
            <strong>10+</strong>
          </div>
          <div class="award-hero">
            <img :src="assets.certificateMain" alt="日内瓦发明展金奖证书" />
            <div>
              <span>2024 Highlight</span>
              <b>日内瓦国际发明展金奖</b>
            </div>
          </div>
          <div class="timeline">
            <div v-for="[year, text] in awards" :key="year + text" class="timeline-item">
              <span>{{ year }}</span>
              <p>{{ text }}</p>
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
            <img class="cover-logo cover-logo-hku" :src="assets.hku" alt="香港大学标识" />
            <img class="cover-logo cover-logo-ci3" :src="assets.labLogo" alt="CI³ Lab 标识" />
          </div>
          <div class="cover-image">
            <img :src="assets.coverSite" alt="建筑工业化现场" />
          </div>
          <div class="cover-copy">
            <p class="eyebrow">Collaborative Intelligence</p>
            <h2>CI³ Lab</h2>
            <h3><span>香港大学工程学院</span><strong>协作智能实验室</strong></h3>
            <p class="cover-description">
              CI³ Lab（Collaborative Intelligence with Construction Informatics in Construction Industrialization）由香港大学土木工程系李骁教授创立，是一支专注于建筑工业化场景下协作智能领域的跨学科研究团队。实验室以“探索复杂建造环境中的协作行为及其演化”为愿景，致力于发展建筑信息学与协作智能的前沿方法，解决建筑工业化中的重大交叉学科挑战。核心研究方向涵盖协作机器人、协同调度、分布式协作、知识协同等领域。实验室主任李骁教授为 Clarivate 全球前 1% 顶尖学者及斯坦福全球前 2% 顶尖科学家，带领团队 40 余名科研人员承担科研项目总额逾 2,000 万港元，研究成果获日内瓦国际发明展金奖等 10 多项国内外荣誉及奖项。CI³ Lab 致力于通过开源研究与跨学科协同，为建筑工业化与协作智能的发展贡献学术洞见与技术突破。
            </p>
          </div>
          <div class="contact-card cover-contact-card">
            <div>
              <p>香港大学工程学院<br />协作智能实验室（CI³ Lab）</p>
              <p>地址：香港薄扶林道香港大学黄克竞楼 6 楼</p>
              <p>邮箱：Shell.x.li@hku.hk</p>
              <p>公众号：港大协作智能实验室</p>
            </div>
            <img :src="assets.qr" alt="CI³ Lab 二维码" />
          </div>
        </article>
      </div>
    </section>

    <section class="sheet-section">
      <div class="brochure-sheet inside-sheet">
        <div class="inside-header">
          <div>
            <p class="eyebrow">Construction Industrialization</p>
            <h3>建筑工业化应用生态</h3>
          </div>
          <div class="process-line">
            <span>智能设计</span>
            <span>智能制造</span>
            <span>智能建造</span>
            <span>智能运维</span>
            <span>政策仿真</span>
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
            <p>{{ card.text }}</p>
            <figure class="app-figure">
              <BrochureImage :contain="card.fit === 'contain'" :replacement="isReplacement(card.image)" :src="imageSource(card.image)" :alt="card.caption" />
              <figcaption>{{ card.caption }}</figcaption>
            </figure>
            <ul>
              <li v-for="bullet in card.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </section>
        </article>

        <article class="panel construction-panel">
          <div class="app-title main-app-title">
            <span></span>
            <div>
              <h4>智能建造</h4>
              <p>Intelligent Construction</p>
            </div>
          </div>
          <p>
            混合位姿调节机器人（HyPA）面向模块化建筑吊装对位难、摆动大与感知不足等问题，实现 6 自由度位姿控制、抗风扰减摇与数字孪生闭环优化。
          </p>
          <figure class="construction-main-figure">
            <BrochureImage class="construction-main" natural-height :replacement="isReplacement(assets.construction)" :src="imageSource(assets.construction)" alt="HyPA 现场应用" />
            <figcaption>HyPA 在模块化建筑项目中的设备调试与应用</figcaption>
          </figure>
          <div class="construction-thumbs">
            <figure>
              <img :src="imageSource(assets.hypa)" alt="HyPA 实验平台" />
              <figcaption>HyPA 实验室实验平台</figcaption>
            </figure>
            <figure>
              <img :src="assets.boltArm" alt="悬挂式机械臂末端作业系统" />
              <figcaption>悬挂式机械臂末端作业系统</figcaption>
            </figure>
          </div>
          <ul class="feature-list">
            <li>6 自由度位姿控制与抗风扰减摇</li>
            <li>视觉大模型 + 数字孪生闭环优化</li>
            <li>可扩展集成悬挂式机械臂末端作业系统</li>
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
            <p>{{ card.text }}</p>
            <figure class="app-figure">
              <BrochureImage :contain="card.fit === 'contain'" :replacement="isReplacement(card.image)" :src="imageSource(card.image)" :alt="card.caption" />
              <figcaption>{{ card.caption }}</figcaption>
            </figure>
            <ul>
              <li v-for="bullet in card.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </section>
        </article>
      </div>
    </section>
  </main>
</template>
