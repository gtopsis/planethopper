<script setup lang="ts">
import { type TripPlanItem } from '@/types/index'

export interface Props {
  tripPlanItems: TripPlanItem[]
}
defineProps<Props>()
</script>

<template>
  <ul
    v-if="tripPlanItems.length > 0"
    class="flex w-full flex-col items-center justify-center"
    data-testid="trip-plan-list"
  >
    <li
      v-for="{ id, name } in tripPlanItems"
      :key="id"
      class="bg-background mb-2 w-[80%] rounded-lg px-2 text-wrap shadow last:mb-0 md:py-1"
      data-testid="trip-plan-list-item"
    >
      <span class="prose text-text-secondary text-sm" data-testid="trip-plan-list-item-name">{{
        name
      }}</span>
    </li>
  </ul>

  <p
    v-else
    class="text-text-secondary flex items-center justify-center rounded-lg p-4 text-sm"
    data-testid="trip-plan-list-empty"
  >
    <span>You have not selected any planets</span>
  </p>
</template>

<style lang="css" scoped></style>
