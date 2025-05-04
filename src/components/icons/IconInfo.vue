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
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      />
    </svg>
  </IconWrapper>
</template>

<style lang="css" scoped></style>
