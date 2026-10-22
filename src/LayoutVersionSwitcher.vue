<script setup>
defineProps({
  showStandardLayout: Boolean,
  language: { type: String, default: 'zh' },
})

defineEmits(['toggle'])
</script>

<template>
  <button
    type="button"
    class="layout-version-switcher font-switcher-toggle"
    :aria-pressed="showStandardLayout"
    :title="language === 'en'
      ? (showStandardLayout
          ? 'Switch to the original layout. Adjusted size: A4 landscape, 297 × 210 mm.'
          : 'Switch to the adjusted layout: A4 landscape, 297 × 210 mm.')
      : (showStandardLayout
          ? '点击切换到调整前版面；调整后尺寸为 A4 横向，297 × 210 mm'
          : '点击切换到调整后版面：A4 横向，297 × 210 mm')"
    @click="$emit('toggle')"
  >
    <template v-if="language === 'en'">Layout: {{ showStandardLayout ? 'After' : 'Before' }}</template>
    <template v-else>版面：{{ showStandardLayout ? '调整后' : '调整前' }}</template>
    <span aria-hidden="true"> ⇄</span>
  </button>
</template>
