<script setup lang="ts">
import type { PlanetDestinationExtended } from '@/types'
import { computed } from 'vue'

export interface Props {
  planetDestination: Omit<PlanetDestinationExtended, 'isSelected'>
  isSelected?: PlanetDestinationExtended['isSelected']
}

const props = withDefaults(defineProps<Props>(), { isSelected: false })
const emit = defineEmits<{
  (e: 'select', value: Event): void
}>()

const dynamicClasses = computed(() =>
  props.isSelected
    ? ['border-accent', 'shadow-lg', 'hover:cursor-auto']
    : ['border-surface', 'shadow-md', 'hover:cursor-pointer'],
)
const tooltipText = computed(() => (props.isSelected ? '' : 'Add destination to travel plan'))

const isNumeric = (value: string): boolean => {
  return !Number.isNaN(Number(value)) && value.trim() !== ''
}

const convertNumericValueToUSFormat = (numericValue: number | string): string => {
  if (typeof numericValue === 'string' && !isNumeric(numericValue)) {
    return '-'
  }

  const formattedValue: number =
    typeof numericValue === 'string' ? Number(numericValue) : numericValue

  return Intl.NumberFormat('es-US').format(formattedValue)
}

const formattedPopulation = computed(() =>
  convertNumericValueToUSFormat(props.planetDestination.population),
)

const onClick = (event: Event) => {
  if (props.isSelected) return

  emit('select', event)
}
</script>

<template>
  <button
    class="bg-surface flex w-full rounded-lg border-1 p-4 transition-shadow hover:shadow-lg"
    :class="dynamicClasses"
    :title="tooltipText"
    :data-testid="`planet-destination-${planetDestination.id}`"
    @click="onClick($event)"
  >
    <div class="h-20 w-20 flex-shrink-0">
      <img
        :src="planetDestination.imageUrl"
        :alt="`Image of planet ${planetDestination.name}`"
        class="h-full w-full rounded-lg object-cover"
        :data-testid="`planet-destination-${planetDestination.id}-image`"
      />
    </div>

    <div class="ml-4 flex flex-grow flex-col text-left">
      <h2
        class="text-text-primary flex-grow text-xl font-bold"
        :data-testid="`planet-destination-${planetDestination.id}-name`"
      >
        {{ planetDestination.name }}
      </h2>
      <span
        class="text-text-secondary text-sm"
        :data-testid="`planet-destination-${planetDestination.id}-terrain`"
        >{{ planetDestination.terrain }}</span
      >
      <span
        class="text-text-secondary mt-1 text-sm"
        :data-testid="`planet-destination-${planetDestination.id}-population`"
        >{{ formattedPopulation }}</span
      >
    </div>
  </button>
</template>

<style lang="css" scoped></style>
