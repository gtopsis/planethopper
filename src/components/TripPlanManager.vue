<script setup lang="ts">
import TripPlanList from '@/components/TripPlanList.vue'
import IconClear from '@/components/icons/iconClear.vue'
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

const tripPlanItems = ref([
  { name: 'giorgos', id: '1' },
  { name: 'aris', id: '2' },
])

const removeAllTripPlanItems = () => {
  tripPlanItems.value = []
}
</script>

<template>
  <div class="flex flex-col items-center">
    <p class="mb-1 px-2 py-1 text-center font-bold">
      <span>Your planetary route</span>
    </p>

    <TripPlanList :trip-plan-items="tripPlanItems" />

    <BaseButton
      v-if="tripPlanItems.length > 0"
      class="mt-2"
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
