<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  type?: 'regular' | 'icon' | 'text'
  theme?: 'primary' | 'secondary' | 'accent'
  disabled?: boolean
  title?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'regular',
  theme: 'primary',
  disabled: false,
})

const emit = defineEmits<{ (e: 'click', event: Event): void }>()

const themeClassesMap: Record<typeof props.theme, Record<string, boolean>> = {
  primary: {
    'bg-primary': true,
    'text-white': true,
    'hover:bg-primary-300': true,
    'focus:ring-primary-300': true,
  },
  secondary: {
    'bg-secondary': true,
    'text-secondary-800': true,
    'hover:bg-secondary-300': true,
    'focus:ring-secondary-300': true,
  },
  accent: {
    'bg-accent': true,
    'text-gray-700': true,
    'hover:bg-accent-300': true,
    'focus:ring-accent-300': true,
  },
}
const currentThemeClasses = computed(() => themeClassesMap[props.theme] || {})

const buttonTypeClassesMap: Record<typeof props.type, Record<string, boolean>> = {
  regular: {
    'inline-flex items-center': true,
    'rounded-md': true,
    'px-4 py-2': true,
  },
  icon: {
    'rounded-full': true,
    'p-2': true,
    'flex items-center justify-center': true,
  },
  text: {
    'bg-transparent': true,
    'hover:bg-gray-100': true,
    'p-1': true,
  },
}
const currentButtonTypeClasses = computed(() => buttonTypeClassesMap[props.type] || {})
</script>

<template>
  <button
    :id="id"
    class="inline-block cursor-pointer text-center text-sm font-semibold transition-transform duration-250 hover:scale-102 active:translate-y-[1px] active:shadow-none"
    :class="[
      currentThemeClasses,
      currentButtonTypeClasses,
      { 'opacity-50 hover:cursor-not-allowed': disabled },
    ]"
    :disabled="disabled"
    :title="type === 'icon' ? title : undefined"
    :aria-label="ariaLabel ?? title"
    :aria-disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style lang="css" scoped></style>
