<script setup lang="ts">
import IconInfo from '@/components/icons/IconInfo.vue'
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
        :planet-destination="planetDestination"
        :is-selected="isSelected"
        :data-testid="`planet-destination-item-${planetDestination.id}`"
        @select="onSelectPlanetDestination(planetDestination.id)"
      />
    </li>
  </ul>

  <p
    v-else
    class="text-text-secondary flex items-center justify-center space-x-2 rounded-lg p-4 text-sm"
    data-testid="planet-destination-list-empty"
  >
    <IconInfo class="h-5 w-5" />
    <span>The expansion of the universe did not leave a planet to visit</span>
  </p>
</template>

<style lang="css" scoped></style>
