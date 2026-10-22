<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  replacement: Boolean,
  contain: Boolean,
  naturalHeight: Boolean,
  zoom: { type: Number, default: 1 },
})
</script>

<template>
  <span v-if="replacement" class="image-width-frame" :class="{ 'image-width-frame--natural': naturalHeight }">
    <img :src="src" :alt="alt" :style="zoom === 1 ? undefined : { transform: naturalHeight ? `scale(${zoom})` : `translateY(-50%) scale(${zoom})` }" />
  </span>
  <img v-else :class="{ 'image-contain': contain }" :src="src" :alt="alt" />
</template>
