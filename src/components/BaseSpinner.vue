<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'md' },
)
</script>

<template>
  <div class="flex justify-center">
    <div
      class="border-grey animate-spin rounded-full border-4 border-t-transparent"
      :class="{
        'h-4 w-4': size === 'sm',
        'h-8 w-8': size === 'md',
        'h-12 w-12': size === 'lg',
      }"
    ></div>
  </div>
</template>

<style lang="css" scoped></style>
