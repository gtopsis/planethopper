<script setup lang="ts">
import type { PlanetDestinationExtended } from '@/types'
import PlanetDestinationListItem from './PlanetDestinationListItem.vue'

export interface Props {
  planetDestinationsWithState: PlanetDestinationExtended[]
}
const { planetDestinationsWithState = [] } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'selectPlanetDestination', planeDestinationName: PlanetDestinationExtended['id']): void
}>()

const onSelectPlanetDestination = (planeDestinationId: PlanetDestinationExtended['id']) => {
  emit('selectPlanetDestination', planeDestinationId)
}
</script>

<template>
  <ul v-if="planetDestinationsWithState.length > 0" data-testid="planet-destination-list">
    <li
      v-for="{ isSelected, ...planetDestination } in planetDestinationsWithState"
      :key="planetDestination.id"
    >
      <PlanetDestinationListItem
        :planetDestination="planetDestination"
        :isSelected="isSelected"
        :data-testid="`planet-destination-item-${planetDestination.id}`"
        @select="onSelectPlanetDestination(planetDestination.id)"
      />
    </li>
  </ul>

  <p v-else class="text-text-secondary text-sm" data-testid="planet-destination-list-empty">
    The expansion of the universe did not leave a planet to visit
  </p>
</template>

<style lang="css" scoped></style>
