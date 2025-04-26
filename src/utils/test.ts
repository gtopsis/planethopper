import type { PlanetDestinationData, PlanetDestinationExtended } from '@/types'

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
