import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const STORAGE_KEY = 'brochure-layout-version'
const DESIGN_WIDTH = 1200

export function useLayoutVersion() {
  let initialVersion = 'after'
  try {
    initialVersion = localStorage.getItem(STORAGE_KEY) === 'before' ? 'before' : 'after'
  } catch {
    // The layout switch remains available when browser storage is unavailable.
  }

  const showStandardLayout = ref(initialVersion === 'after')
  const pageShell = ref(null)
  const previewScale = ref(1)
  const previewStyle = computed(() => ({
    '--brochure-preview-scale': String(previewScale.value),
  }))
  let resizeObserver

  function updatePreviewScale() {
    const shell = pageShell.value
    if (!shell) return

    const styles = getComputedStyle(shell)
    const horizontalPadding =
      (parseFloat(styles.paddingLeft) || 0) + (parseFloat(styles.paddingRight) || 0)
    const availableWidth = shell.clientWidth - horizontalPadding
    const nextScale = Math.min(1, Math.max(1, availableWidth) / DESIGN_WIDTH)

    if (Math.abs(nextScale - previewScale.value) > 0.0001) {
      previewScale.value = nextScale
    }
  }

  function toggleLayoutVersion() {
    showStandardLayout.value = !showStandardLayout.value
    try {
      localStorage.setItem(STORAGE_KEY, showStandardLayout.value ? 'after' : 'before')
    } catch {
      // Persisting the selection is optional.
    }
  }

  onMounted(() => {
    updatePreviewScale()
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updatePreviewScale)
      resizeObserver.observe(pageShell.value)
    } else {
      window.addEventListener('resize', updatePreviewScale)
    }
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    window.removeEventListener('resize', updatePreviewScale)
  })

  return { showStandardLayout, toggleLayoutVersion, pageShell, previewStyle }
}
