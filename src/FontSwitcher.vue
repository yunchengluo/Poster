<script setup>
import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'brochure-font-family'

const fontOptions = [
  {
    id: 'default',
    label: 'Default',
    family:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
  },
  {
    id: 'times-new-roman',
    label: 'Times New Roman',
    family: '"Times New Roman", Times, serif',
  },
  {
    id: 'baskerville',
    label: 'Baskerville',
    family: 'Baskerville, "Libre Baskerville", "Baskerville Old Face", "Goudy Old Style", Garamond, serif',
  },
]

const open = ref(false)
const activeFontId = ref('baskerville')
const fontClassNames = fontOptions.map((item) => `font-${item.id}`)

function applyFont(fontId) {
  const option = fontOptions.find((item) => item.id === fontId) ?? fontOptions.find((item) => item.id === 'baskerville')
  activeFontId.value = option.id
  document.documentElement.style.setProperty('--app-font-family', option.family)
  document.documentElement.classList.remove(...fontClassNames)
  document.documentElement.classList.add(`font-${option.id}`)
  localStorage.setItem(STORAGE_KEY, option.id)
  open.value = false
}

function togglePanel() {
  open.value = !open.value
}

onMounted(() => {
  const savedFontId = localStorage.getItem(STORAGE_KEY)
  applyFont(savedFontId && fontOptions.some((item) => item.id === savedFontId) ? savedFontId : 'baskerville')
})
</script>

<template>
  <div class="font-switcher">
    <button type="button" class="font-switcher-toggle" aria-haspopup="listbox" :aria-expanded="open" @click="togglePanel">
      Font
    </button>
    <div v-if="open" class="font-switcher-panel" role="listbox" aria-label="Font options">
      <button
        v-for="option in fontOptions"
        :key="option.id"
        type="button"
        role="option"
        class="font-switcher-option"
        :class="{ active: option.id === activeFontId }"
        :aria-selected="option.id === activeFontId"
        :style="{ fontFamily: option.family }"
        @click="applyFont(option.id)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
