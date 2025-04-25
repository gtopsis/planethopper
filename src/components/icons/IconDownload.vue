<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
}
withDefaults(defineProps<Props>(), { size: 'md' })

const sizeInPixels = {
  sm: 16,
  md: 20,
  lg: 24,
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    :width="sizeInPixels[size]"
    :height="sizeInPixels[size]"
    fill="currentColor"
  >
    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
  </svg>
</template>

<style lang="css" scoped></style>
