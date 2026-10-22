<script setup>
defineProps({
  showExpandedWhitespace: Boolean,
  language: { type: String, default: 'zh' },
})

defineEmits(['toggle'])
</script>

<template>
  <button
    type="button"
    class="whitespace-version-switcher font-switcher-toggle"
    :aria-pressed="showExpandedWhitespace"
    :title="language === 'en'
      ? (showExpandedWhitespace
          ? 'Show before spacing. After increases only the spacing inside each panel or card by 1.5 times.'
          : 'Show after spacing: 1.5 times the spacing inside each panel or card.')
      : (showExpandedWhitespace
          ? '点击查看改前下方留白；改后仅把内容框内部的底部间距扩大至 1.5 倍'
          : '点击查看改后下方留白：仅扩大内容框内部的底部间距至 1.5 倍')"
    @click="$emit('toggle')"
  >
    <template v-if="language === 'en'">Bottom spacing: {{ showExpandedWhitespace ? 'After' : 'Before' }}</template>
    <template v-else>下方留白：{{ showExpandedWhitespace ? '改后' : '改前' }}</template>
    <span aria-hidden="true"> ⇄</span>
  </button>
</template>
