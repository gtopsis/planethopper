import type { PlanetDestinationData, PlanetDestinationExtended } from '@/types'
import { type VueWrapper } from '@vue/test-utils'

export const createPlanetDestinationData = (
  overrides: Partial<PlanetDestinationData> = {},
): PlanetDestinationData => ({
  name: 'Tatooine',
  terrain: 'Desert',
  population: '200000',
  url: 'https://host:port/planets/id',
  ...overrides,
})

export const createPlanetDestinationExtended = (
  overrides: Partial<PlanetDestinationExtended> = {},
): PlanetDestinationExtended => ({
  ...createPlanetDestinationData(),
  imageUrl: '/tatooine.jpg',
  id: '1',
  isSelected: false,
  ...overrides,
})

export const generateElementTestSelector = (id: string): string => {
  return `[data-testid="${id}"]`
}

export const getElement = (wrapper: VueWrapper, id: string): ReturnType<VueWrapper['find']> => {
  const element = wrapper.find(generateElementTestSelector(id))
  if (!element.exists()) {
    console.warn(`Element with test ID "${id}" not found`)
  }
  return element
}

export const getElementContent = (wrapper: VueWrapper, id: string) => {
  return getElement(wrapper, id).text()
}

export const getElementAttribute = (
  wrapper: VueWrapper,
  id: string,
  attributeName: string,
): string | undefined => {
  return getElement(wrapper, id).attributes(attributeName)
}

export const getElementClass = (wrapper: VueWrapper, id: string): string[] => {
  return getElement(wrapper, id).classes()
}
