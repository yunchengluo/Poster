<script setup>
defineProps({
  showReplacements: Boolean,
  language: { type: String, default: 'zh' },
})

defineEmits(['toggle'])
</script>

<template>
  <button
    type="button"
    class="image-version-switcher font-switcher-toggle"
    :aria-pressed="showReplacements"
    :title="language === 'en'
      ? (showReplacements ? 'Show original images' : 'Show replacement images')
      : (showReplacements ? '点击查看替换前图片' : '点击查看替换后图片')"
    @click="$emit('toggle')"
  >
    <template v-if="language === 'en'">Images: {{ showReplacements ? 'After' : 'Before' }}</template>
    <template v-else>图片：{{ showReplacements ? '替换后' : '替换前' }}</template>
    <span aria-hidden="true"> ⇄</span>
  </button>
</template>
