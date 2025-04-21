<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  imageUrl: string
  terrain: string
  population: number
  isActive: boolean
}

const { population, isActive = false } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'click', value: Event): void
}>()

const dynamicClasses = computed(() =>
  isActive
    ? ['border-accent', 'border-1 shadow-lg', 'hover:cursor-auto']
    : ['shadow-md', 'hover:cursor-pointer'],
)
const formattedPopulation = computed(() => Intl.NumberFormat('es-US').format(population))
const tooltipText = computed(() => (isActive ? '' : 'Select'))

const onClick = (event: Event) => {
  if (isActive) return

  emit('click', event)
}
</script>

<template>
  <button
    class="bg-surface flex w-full rounded-lg p-4 transition-shadow hover:shadow-lg"
    :class="dynamicClasses"
    :title="tooltipText"
    @click="onClick($event)"
  >
    <div class="h-20 w-20 flex-shrink-0">
      <img :src="imageUrl" :alt="name" class="h-full w-full rounded-lg object-cover" />
    </div>

    <div class="ml-4 flex flex-grow flex-col text-left">
      <h2 class="text-text-primary flex-grow text-xl font-bold">{{ name }}</h2>
      <span class="text-text-secondary text-sm">{{ terrain }}</span>
      <span class="text-text-secondary mt-1 text-sm">{{ formattedPopulation }}</span>
    </div>
  </button>
</template>

<style lang="css" scoped></style>
