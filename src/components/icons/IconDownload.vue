<script setup lang="ts">
import IconWrapper, { type IconSize } from '@/components/icons/IconWrapper.vue'

interface Props {
  size?: IconSize
  color?: string
}
withDefaults(defineProps<Props>(), { size: 'md', color: '#030104' })
</script>

<template>
  <IconWrapper v-slot="{ sizeInPixels, color }" :size="size" :color="color">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      :width="sizeInPixels"
      :height="sizeInPixels"
      :fill="color"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
  </IconWrapper>
</template>

<style lang="css" scoped></style>
