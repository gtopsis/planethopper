import { appConfig } from '@/appConfig'
import { planetDestinationService } from '@/services/planetDestinationService'
import type { PlanetDestinationExtended, TripPlanItem } from '@/types'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const usePlanetHopperStore = defineStore('planetHopperStore', () => {
  const { createPaginatedApiUrlString } = planetDestinationService()

  const totalPlanetDestinations = useLocalStorage<PlanetDestinationExtended[]>(
    appConfig.STORE_KEY_PLANET_DESTINATIONS,
    [],
    { deep: true },
  )
  const tripPlanItems = useLocalStorage<TripPlanItem[]>(appConfig.STORE_KEY_TRIP_PLAN, [], {
    deep: true,
  })
  const nextPageUrl = useLocalStorage<string>(
    appConfig.STORE_KEY_PLANET_DESTINATIONS_API_NEXT_PAGE_URL,
    createPaginatedApiUrlString(),
    {},
  )

  const planetDestinationApiNextPageUrl = computed(() => nextPageUrl.value)

  const addPlanetDestinations = (destinations: PlanetDestinationExtended[]) => {
    totalPlanetDestinations.value = totalPlanetDestinations.value.concat(destinations)
  }

  const selectPlanetDestinationWithId = (id: PlanetDestinationExtended['id']) => {
    if (tripPlanItems.value.length >= appConfig.TRIP_PLAN_DESTINATIONS_MAX_NUMBER) {
      return
    }

    const found = totalPlanetDestinations.value.find((d) => d.id === id)
    if (!found) return

    found.isSelected = true
    addItemToTripPlan({ id: found.id, name: found.name })
  }

  const addItemToTripPlan = (item: TripPlanItem) => {
    tripPlanItems.value.push(item)
  }

  const removeAllItemsFromTripPlan = () => {
    const currentSelectedPlanetDestinations = totalPlanetDestinations.value.filter(
      (d) => d.isSelected,
    )
    currentSelectedPlanetDestinations.forEach((d) => {
      d.isSelected = false
    })
    tripPlanItems.value = []
  }

  const setPlanetDestinationApiNextPageUrl = (url: string | undefined | null) => {
    nextPageUrl.value = url ?? ''
  }

  const reset = () => {
    totalPlanetDestinations.value = []
    tripPlanItems.value = []
  }

  return {
    planetDestinationApiNextPageUrl,
    totalPlanetDestinations,
    tripPlanItems,
    addPlanetDestinations,
    selectPlanetDestinationWithId,
    addItemToTripPlan,
    removeAllItemsFromTripPlan,
    setPlanetDestinationApiNextPageUrl,
    reset,
  }
})
