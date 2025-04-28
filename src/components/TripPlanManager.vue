<script setup lang="ts">
import TripPlanList from '@/components/TripPlanList.vue'
import IconClear from '@/components/icons/iconClear.vue'
import { usePlanetHopperStore } from '@/stores/planetHopperStore'
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const planetDestinationStore = usePlanetHopperStore()

const tripPlanItems = computed(() => planetDestinationStore.tripPlanItems)

const removeAllTripPlanItems = () => {
  planetDestinationStore.removeAllItemsFromTripPlan()
}
</script>

<template>
  <div class="prose lg:prose-xl flex flex-col items-center">
    <p class="mb-1 px-2 py-1 text-center font-bold">
      <span>Your planetary route</span>
    </p>

    <TripPlanList :trip-plan-items="tripPlanItems" />

    <BaseButton
      v-if="tripPlanItems.length > 0"
      class="md:mt-2"
      theme="error"
      aria-label="Load more destinations to planets"
      @click="removeAllTripPlanItems"
    >
      <IconClear class="mr-2" size="sm" />
      <span>Clear list</span>
    </BaseButton>
  </div>
</template>

<style lang="css" scoped></style>
