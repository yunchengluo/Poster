import { ref } from 'vue'

const STORAGE_KEY = 'brochure-whitespace-version'

export function useWhitespaceVersion() {
  let initialVersion = 'after'
  try {
    initialVersion = localStorage.getItem(STORAGE_KEY) === 'before' ? 'before' : 'after'
  } catch {
    // The spacing switch remains available when browser storage is unavailable.
  }

  const showExpandedWhitespace = ref(initialVersion === 'after')

  function toggleWhitespaceVersion() {
    showExpandedWhitespace.value = !showExpandedWhitespace.value
    try {
      localStorage.setItem(STORAGE_KEY, showExpandedWhitespace.value ? 'after' : 'before')
    } catch {
      // Persisting the selection is optional.
    }
  }

  return { showExpandedWhitespace, toggleWhitespaceVersion }
}
