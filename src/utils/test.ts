import type { PlanetDestinationExtended } from '@/types'

export const createPlanetDestinationExtended = (
  overrides: Partial<PlanetDestinationExtended> = {},
): PlanetDestinationExtended => ({
  id: 1,
  name: 'Tatooine',
  imageUrl: '/tatooine.jpg',
  terrain: 'Desert',
  population: '200000',
  url: 'https://host:port/planets/id',
  isSelected: false,
  ...overrides,
})
