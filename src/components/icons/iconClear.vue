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
      viewBox="0 0 24 24"
      :width="sizeInPixels"
      :height="sizeInPixels"
      :fill="color"
    >
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  </IconWrapper>
</template>

<style lang="css" scoped></style>
