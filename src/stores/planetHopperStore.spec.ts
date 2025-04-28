import { createPlanetDestinationExtended } from '@/utils/test'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { usePlanetHopperStore } from './planetHopperStore'

describe('planetHopperStore', () => {
  let store: ReturnType<typeof usePlanetHopperStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = usePlanetHopperStore()
    store.reset()
  })

  it('should initialize with empty arrays', () => {
    expect(store.totalPlanetDestinations).toEqual([])
    expect(store.tripPlanItems).toEqual([])
  })

  it('should add planet destinations', () => {
    const planetDestinations = [
      createPlanetDestinationExtended({ id: '1', name: 'Mars', isSelected: false }),
      createPlanetDestinationExtended({ id: '2', name: 'Venus', isSelected: false }),
    ]

    store.addPlanetDestinations(planetDestinations)

    expect(store.totalPlanetDestinations).toEqual(planetDestinations)
  })

  it('should select planet destination and add it to trip plan', () => {
    const planetDestinations = [
      createPlanetDestinationExtended({ id: '1', name: 'Mars', isSelected: false }),
      createPlanetDestinationExtended({ id: '2', name: 'Venus', isSelected: false }),
    ]
    store.addPlanetDestinations(planetDestinations)

    store.selectPlanetDestinationWithId('1')

    expect(store.totalPlanetDestinations[0].isSelected).toBe(true)
    expect(store.tripPlanItems).toEqual([{ id: '1', name: 'Mars' }])
  })

  it('should not select planet destination or add it to trip plan when the latest has already maximum number of destinations', () => {
    // Note: default value for maximum number of trip plan destinations is equal to 5
    const planetDestinations = [
      createPlanetDestinationExtended({ id: '1', name: 'Mars', isSelected: true }),
      createPlanetDestinationExtended({ id: '2', name: 'Venus', isSelected: true }),
      createPlanetDestinationExtended({ id: '3', name: 'Mercury', isSelected: true }),
      createPlanetDestinationExtended({ id: '4', name: 'Jupiter', isSelected: true }),
      createPlanetDestinationExtended({ id: '5', name: 'Uranus', isSelected: true }),
      createPlanetDestinationExtended({ id: '6', name: 'Earth', isSelected: false }),
    ]
    store.addPlanetDestinations(planetDestinations)
    const tripPlanItems = planetDestinations
      .filter((pd) => pd.id !== '6')
      .map((pd) => ({ id: pd.id, name: pd.name }))
    store.addItemToTripPlan(tripPlanItems[0])
    store.addItemToTripPlan(tripPlanItems[1])
    store.addItemToTripPlan(tripPlanItems[2])
    store.addItemToTripPlan(tripPlanItems[3])
    store.addItemToTripPlan(tripPlanItems[4])

    store.selectPlanetDestinationWithId('6')

    expect(store.totalPlanetDestinations[5].isSelected).toBe(false)
    expect(store.tripPlanItems).toHaveLength(5)
    expect(store.tripPlanItems).toEqual(expect.not.arrayContaining([{ id: '6', name: 'Earth' }]))
  })

  it('does nothing when selecting non-existent planet', () => {
    const planetDestinations = [
      createPlanetDestinationExtended({ id: '1', name: 'Mars', isSelected: false }),
    ]
    store.addPlanetDestinations(planetDestinations)

    store.selectPlanetDestinationWithId('999')

    expect(store.tripPlanItems).toEqual([])
  })

  it('should add item to trip plan', () => {
    const tripItem = { id: '1', name: 'Mars' }

    store.addItemToTripPlan(tripItem)

    expect(store.tripPlanItems).toEqual([tripItem])
  })

  it('should remove all items from trip plan and deselect planets', () => {
    const destinations = [
      createPlanetDestinationExtended({ id: '1', name: 'Mars', isSelected: true }),
      createPlanetDestinationExtended({ id: '2', name: 'Venus', isSelected: true }),
    ]
    store.addPlanetDestinations(destinations)
    store.addItemToTripPlan({ id: '1', name: 'Mars' })
    store.addItemToTripPlan({ id: '2', name: 'Venus' })

    store.removeAllItemsFromTripPlan()

    expect(store.tripPlanItems).toEqual([])
    expect(store.totalPlanetDestinations.every((d) => !d.isSelected)).toBe(true)
  })
})
