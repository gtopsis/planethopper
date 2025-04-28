<script setup lang="ts">
import IconPlanet from '@/components/icons/iconPlanet.vue'
import { type TripPlanItem } from '@/types/index'

export interface Props {
  tripPlanItems: TripPlanItem[]
}
defineProps<Props>()
</script>

<template>
  <div v-if="tripPlanItems.length > 0" class="w-[95%]">
    <p class="prose mb-2 self-start text-sm">Start</p>

    <ol
      class="relative w-full border-s border-gray-200 dark:border-gray-700"
      data-testid="trip-plan-list"
    >
      <li
        v-for="{ id, name } in tripPlanItems"
        :key="id"
        class="relative ms-5 mb-2 md:mb-3"
        data-testid="trip-plan-list-item"
      >
        <span
          class="dark:bg-secondary absolute -start-7 bottom-[4px] flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 ring-3 ring-white dark:ring-gray-900"
        >
          <IconPlanet />
        </span>
        <div
          class="items-center justify-between rounded-lg border border-gray-200 bg-white px-2 shadow-xs sm:flex dark:border-gray-600 dark:bg-gray-700"
        >
          <span
            class="prose text-text-secondary text-xs md:text-sm"
            data-testid="trip-plan-list-item-name"
          >
            {{ name }}
          </span>
        </div>
      </li>
    </ol>
  </div>

  <p
    v-else
    class="text-text-secondary flex items-center justify-center rounded-lg p-4 text-sm"
    data-testid="trip-plan-list-empty"
  >
    <span>You have not selected any planets</span>
  </p>
</template>

<style lang="css" scoped></style>
