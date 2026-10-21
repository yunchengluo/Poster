// Exact English brochure copy, with its current (after) image sources.
const assets = {
  hku: new URL('../assets/logos/hku-logo.png', import.meta.url).href,
  labLogo: new URL('../assets/logos/ci3-lab-logo.png', import.meta.url).href,
  certificateMain: new URL('../assets/awards/geneva-gold-medal-2024.jpeg', import.meta.url).href,
  certificateA: new URL('../assets/awards/huaxia-construction-science-technology.jpeg', import.meta.url).href,
  certificateB: new URL('../assets/awards/best-paper-award-01.jpeg', import.meta.url).href,
  certificateC: new URL('../assets/awards/best-paper-award-02.jpeg', import.meta.url).href,
  certificateD: new URL('../assets/awards/wbc-best-paper-2025.png', import.meta.url).href,
  certificateE: new URL('../assets/awards/iccrem-best-paper-2024.jpeg', import.meta.url).href,
  certificateF: new URL('../assets/awards/icls-best-paper-2025.jpeg', import.meta.url).href,
  certificateG: new URL('../assets/awards/best-innovation-and-impact.jpeg', import.meta.url).href,
  certificateH: new URL('../assets/awards/best-conference-paper-second-prize.jpeg', import.meta.url).href,
  certificateI: new URL('../assets/awards/best-presentation-award.jpeg', import.meta.url).href,
  certificateJ: new URL('../assets/awards/cic-construction-innovation-2022.jpeg', import.meta.url).href,
  robot: new URL('../assets/research/collaborative-robotics.jpeg', import.meta.url).href,
  schedule: new URL('../assets/research/collaborative-scheduling.jpg', import.meta.url).href,
  distributed: new URL('../assets/research/distributed-collaboration.png', import.meta.url).href,
  knowledge: new URL('../assets/research/knowledge-collaboration.png', import.meta.url).href,
  design: new URL('../assets/impacts/intelligent-design.png', import.meta.url).href,
  manufacturing: new URL('../assets/impacts/intelligent-manufacturing.png', import.meta.url).href,
  construction: new URL('../assets/impacts/hypa-field-deployment.jpg', import.meta.url).href,
  hypa: new URL('../assets/impacts/hypa-experimental-platform.jpg', import.meta.url).href,
  boltArm: new URL('../assets/impacts/suspended-robotic-arm.png', import.meta.url).href,
  operation: new URL('../assets/impacts/operation-maintenance-framework.png', import.meta.url).href,
  policy: new URL('../assets/impacts/regional-policy-simulation.png', import.meta.url).href,
}



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

export { assets, researchCards, awards, awardImages, applicationCards }
