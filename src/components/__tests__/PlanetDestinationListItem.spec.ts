import type { PlanetDestinationExtended } from '@/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PlanetDestinationListItem from '../PlanetDestinationListItem.vue'

type PlanetDestinationListItemProps = {
  planetDestination: Omit<PlanetDestinationExtended, 'isSelected'>
  isSelected: boolean
}

const createPlanetDestination = (
  overrides: Partial<PlanetDestinationListItemProps['planetDestination']> = {},
) => ({
  id: 1,
  name: 'Tatooine',
  imageUrl: '/tatooine.jpg',
  terrain: 'Desert',
  population: 200000,
  url: 'https://host:port/planets/id',
  ...overrides,
})

const createPlanetDestinationListItemProps = (
  overrides: Partial<PlanetDestinationListItemProps> = {},
): PlanetDestinationListItemProps => {
  return {
    planetDestination: createPlanetDestination(overrides.planetDestination),
    isSelected: false,
    ...overrides,
  }
}

const generateElementTestSelector = (id: number, attribute?: string): string => {
  const testIdPrefix = `planet-item-${id}`
  if (!attribute) {
    return `[data-testid="${testIdPrefix}"]`
  }

  return `[data-testid="${testIdPrefix}-${attribute}"]`
}

describe('PlanetDestinationListItem', () => {
  it('renders planet destination details correctly', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps(),
    })

    const imageElement = wrapper.find(generateElementTestSelector(1, 'image'))
    expect(imageElement.attributes('src')).toBe('/tatooine.jpg')
    expect(imageElement.attributes('alt')).toBe('Image of planet Tatooine')
    expect(wrapper.find(generateElementTestSelector(1, 'name')).text()).toBe('Tatooine')
    expect(wrapper.find(generateElementTestSelector(1, 'terrain')).text()).toBe('Desert')
    expect(wrapper.find(generateElementTestSelector(1, 'population')).text()).toBe('200,000')
  })

  it('applies correct classes when not selected', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps(),
    })

    expect(wrapper.find(generateElementTestSelector(1)).classes()).toEqual(
      expect.arrayContaining(['border-surface', 'shadow-md', 'hover:cursor-pointer']),
    )
  })

  it('applies correct classes when selected', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({ isSelected: true }),
    })

    expect(wrapper.find(generateElementTestSelector(1)).classes()).toEqual(
      expect.arrayContaining(['border-accent', 'shadow-lg', 'hover:cursor-auto']),
    )
  })

  it('emits select event when clicked and not selected', async () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps(),
    })

    await wrapper.find(generateElementTestSelector(1)).trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')).toHaveLength(1)
  })

  it('does not emit select event when clicked and already selected', async () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({ isSelected: true }),
    })

    await wrapper.find(generateElementTestSelector(1)).trigger('click')

    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('shows correct tooltip text when not selected', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps(),
    })

    expect(wrapper.find(generateElementTestSelector(1)).attributes('title')).toBe(
      'Add destination to travel plan',
    )
  })

  it('shows no tooltip text when selected', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({ isSelected: true }),
    })

    expect(wrapper.find(generateElementTestSelector(1)).attributes('title')).toBe('')
  })

  it('formats population number correctly', () => {
    const wrapper = mount(PlanetDestinationListItem, {
      props: createPlanetDestinationListItemProps({
        planetDestination: createPlanetDestination({ population: 1000000 }),
      }),
    })

    expect(wrapper.find(generateElementTestSelector(1, 'population')).text()).toBe('1,000,000')
  })
})
