import { ref } from 'vue'

const STORAGE_KEY = 'brochure-image-version'

const replacements = {
  schedule: new URL('../assets/调度协同.jpg', import.meta.url).href,
  distributed: new URL('../assets/分布式协作-裁切.png', import.meta.url).href,
  design: new URL('../assets/智能设计.png', import.meta.url).href,
  manufacturing: new URL('../assets/智能制造.png', import.meta.url).href,
  knowledge: new URL('../assets/知识协同.png', import.meta.url).href,
  construction: new URL('../assets/3.jpg', import.meta.url).href,
  hypa: new URL('../assets/2.jpg', import.meta.url).href,
}

export function useImageVersion(assets) {
  let initialVersion = 'after'
  try {
    initialVersion = localStorage.getItem(STORAGE_KEY) === 'before' ? 'before' : 'after'
  } catch {
    // The switch still works when browser storage is unavailable.
  }

  const showReplacements = ref(initialVersion === 'after')
  const replacementsBySource = new Map(
    Object.entries(replacements).map(([key, source]) => [assets[key], source]),
  )

  function imageSource(source) {
    return showReplacements.value ? replacementsBySource.get(source) ?? source : source
  }

  function isReplacement(source) {
    return showReplacements.value && replacementsBySource.has(source)
  }

  function toggleImageVersion() {
    showReplacements.value = !showReplacements.value
    try {
      localStorage.setItem(STORAGE_KEY, showReplacements.value ? 'after' : 'before')
    } catch {
      // Persisting the selection is optional.
    }
  }

  return { showReplacements, imageSource, isReplacement, toggleImageVersion }
}
