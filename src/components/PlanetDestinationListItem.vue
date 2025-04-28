<script setup lang="ts">
import BaseImageSkeletonPlaceholder from '@/components/BaseImageSkeletonPlaceholder.vue'
import type { PlanetDestinationExtended } from '@/types'
import { computed, ref } from 'vue'

export interface Props {
  planetDestination: Omit<PlanetDestinationExtended, 'isSelected'>
  isSelected?: PlanetDestinationExtended['isSelected']
}

const props = withDefaults(defineProps<Props>(), { isSelected: false })
const emit = defineEmits<{
  (e: 'select', value: Event): void
}>()

const isImageLoaded = ref(false)

const dynamicClasses = computed(() =>
  props.isSelected
    ? ['border-secondary', 'shadow-lg', 'hover:cursor-auto']
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

const formattedTerrain = computed(() =>
  props.planetDestination.terrain !== 'unknown' ? props.planetDestination.terrain : '-',
)
const formattedPopulation = computed(() =>
  convertNumericValueToUSFormat(props.planetDestination.population),
)

const onClick = (event: Event) => {
  if (props.isSelected) return

  emit('select', event)
}

const onLoadImage = () => {
  isImageLoaded.value = true
}
</script>

<template>
  <button
    class="bg-surface flex w-full rounded-lg border-2 p-2 transition-shadow hover:shadow-lg md:p-3"
    :class="dynamicClasses"
    :title="tooltipText"
    :data-testid="`planet-destination-${planetDestination.id}`"
    @click="onClick($event)"
  >
    <div class="h-15 w-15 flex-shrink-0 md:h-20 md:w-20">
      <BaseImageSkeletonPlaceholder v-if="!isImageLoaded" class="h-full w-full" />

      <img
        v-show="isImageLoaded"
        :src="planetDestination.imageUrl"
        :alt="`Image of planet ${planetDestination.name}`"
        class="h-full w-full rounded-lg object-cover"
        :data-testid="`planet-destination-${planetDestination.id}-image`"
        @load="onLoadImage"
      />
    </div>

    <div class="ml-4 flex flex-grow flex-col text-left">
      <h2
        class="text-text-primary flex-grow text-sm font-bold md:text-xl"
        :data-testid="`planet-destination-${planetDestination.id}-name`"
      >
        {{ planetDestination.name }}
      </h2>
      <span
        class="text-text-secondary text-xs md:text-sm"
        :data-testid="`planet-destination-${planetDestination.id}-terrain`"
        >{{ formattedTerrain }}</span
      >
      <span
        class="text-text-secondary mt-1 text-xs md:text-sm"
        :data-testid="`planet-destination-${planetDestination.id}-population`"
        >{{ formattedPopulation }}</span
      >
    </div>
  </button>
</template>

<style lang="css" scoped></style>
