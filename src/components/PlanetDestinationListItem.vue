<script setup lang="ts">
import type { PlanetDestinationExtended } from '@/types'
import { computed } from 'vue'

interface Props {
  planetDestination: Omit<PlanetDestinationExtended, 'isSelected'>
  isSelected: PlanetDestinationExtended['isSelected']
}

const { planetDestination, isSelected = false } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'select', value: Event): void
}>()

const dynamicClasses = computed(() =>
  isSelected
    ? ['border-accent', 'shadow-lg', 'hover:cursor-auto']
    : ['border-surface', 'shadow-md', 'hover:cursor-pointer'],
)
const tooltipText = computed(() => (isSelected ? '' : 'Add destination to trip plan'))

const convertNumericValueToUSFormat = (numericValue: number): string =>
  Intl.NumberFormat('es-US').format(numericValue)
const formattedPopulation = computed(() =>
  convertNumericValueToUSFormat(planetDestination.population),
)

const onClick = (event: Event) => {
  if (isSelected) return

  emit('select', event)
}
</script>

<template>
  <button
    class="bg-surface flex w-full rounded-lg border-1 p-4 transition-shadow hover:shadow-lg"
    :class="dynamicClasses"
    :title="tooltipText"
    @click="onClick($event)"
  >
    <div class="h-20 w-20 flex-shrink-0">
      <img
        :src="planetDestination.imageUrl"
        :alt="planetDestination.name"
        class="h-full w-full rounded-lg object-cover"
      />
    </div>

    <div class="ml-4 flex flex-grow flex-col text-left">
      <h2 class="text-text-primary flex-grow text-xl font-bold">{{ planetDestination.name }}</h2>
      <span class="text-text-secondary text-sm">{{ planetDestination.terrain }}</span>
      <span class="text-text-secondary mt-1 text-sm">{{ formattedPopulation }}</span>
    </div>
  </button>
</template>

<style lang="css" scoped></style>
