import { createPlanetDestinationExtended } from '@/utils/test'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PlanetDestinationList, {
  type Props as PlanetDestinationListProps,
} from '../PlanetDestinationList.vue'
import type PlanetDestinationListItem from '../PlanetDestinationListItem.vue'

const createPlanetDestinationListProps = (
  overrides: Partial<PlanetDestinationListProps> = {},
): PlanetDestinationListProps => {
  return {
    planetDestinationsWithState: [createPlanetDestinationExtended()],
    ...overrides,
  }
}

describe('PlanetDestinationList', () => {
  it('renders empty state when no planet destinations are provided', () => {
    const wrapper = shallowMount(PlanetDestinationList, {
      props: createPlanetDestinationListProps({
        planetDestinationsWithState: [],
      }),
    })

    expect(wrapper.find('[data-testid="planet-destination-list-empty"]').exists()).toBe(true)
  })

  it('renders correct number of planet destination items', () => {
    const planets = [
      createPlanetDestinationExtended({ id: 1 }),
      createPlanetDestinationExtended({ id: 2 }),
      createPlanetDestinationExtended({ id: 3 }),
    ]
    const wrapper = shallowMount(PlanetDestinationList, {
      props: createPlanetDestinationListProps({
        planetDestinationsWithState: planets,
      }),
    })

    const planetDestinationElements = wrapper.findAll('[data-testid^="planet-destination-item-"]')
    expect(planetDestinationElements).toHaveLength(3)
    expect(planetDestinationElements[0].attributes('data-testid')).toBe('planet-destination-item-1')
    expect(planetDestinationElements[1].attributes('data-testid')).toBe('planet-destination-item-2')
    expect(planetDestinationElements[2].attributes('data-testid')).toBe('planet-destination-item-3')
  })

  it('passes correct props to the child components of type PlaneDestinationListItem', () => {
    const planet = createPlanetDestinationExtended({ isSelected: true })
    const wrapper = shallowMount(PlanetDestinationList, {
      props: createPlanetDestinationListProps({
        planetDestinationsWithState: [planet],
      }),
    })

    const planetDestinationItemStub = wrapper.findComponent<typeof PlanetDestinationListItem>(
      '[data-testid="planet-destination-item-1"]',
    )
    expect(planetDestinationItemStub.props('planetDestination')).toMatchObject({
      id: planet.id,
      name: planet.name,
      imageUrl: planet.imageUrl,
      terrain: planet.terrain,
      population: planet.population,
    })
    expect(planetDestinationItemStub.props('isSelected')).toBe(true)
  })

  it('emits select event when child component triggers select', async () => {
    const planet = createPlanetDestinationExtended()
    const wrapper = shallowMount(PlanetDestinationList, {
      props: createPlanetDestinationListProps({
        planetDestinationsWithState: [planet],
      }),
    })

    await wrapper.findComponent('[data-testid="planet-destination-item-1"]').trigger('select')

    expect(wrapper.emitted('selectPlanetDestination')).toBeTruthy()
    expect(wrapper.emitted('selectPlanetDestination')?.[0]).toEqual([planet.id])
  })

  it('handles multiple planets with different selected states', () => {
    const planets = [
      createPlanetDestinationExtended({ id: 1, isSelected: true }),
      createPlanetDestinationExtended({ id: 2, isSelected: false }),
      createPlanetDestinationExtended({ id: 3, isSelected: true }),
    ]
    const wrapper = shallowMount(PlanetDestinationList, {
      props: createPlanetDestinationListProps({
        planetDestinationsWithState: planets,
      }),
    })
    const planetItems = wrapper.findAllComponents<typeof PlanetDestinationListItem>(
      '[data-testid^="planet-destination-item"]',
    )

    expect(planetItems[0].props('isSelected')).toBe(true)
    expect(planetItems[1].props('isSelected')).toBe(false)
    expect(planetItems[2].props('isSelected')).toBe(true)
  })
})
