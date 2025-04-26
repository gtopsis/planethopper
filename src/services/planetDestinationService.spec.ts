import { appConfig } from '@/appConfig'
import {
  destinationImagesNames,
  planetDestinationService,
} from '@/services/planetDestinationService'
import type { PlanetDestinationData } from '@/types'
import { createPlanetDestinationData } from '@/utils/test'
import { describe, expect, it } from 'vitest'

describe('planetDestinationService', () => {
  const { createPaginatedApiUrlString, populatePlanetDestinations } = planetDestinationService()

  it('should create a paginated api url string without arguments', () => {
    const url = createPaginatedApiUrlString()

    expect(url).toBe(`${appConfig.TRIP_DESTINATION_API_URL}?page=1`)
  })

  it('should create a paginated api url string with only page argument', () => {
    const url = createPaginatedApiUrlString(2)

    expect(url).toBe(`${appConfig.TRIP_DESTINATION_API_URL}?page=2`)
  })

  it('should create a paginated api url string with page and baseUrl arguments', () => {
    const url = createPaginatedApiUrlString(3, 'https://custom-api.com')

    expect(url).toBe('https://custom-api.com/?page=3')
  })

  it('should populate planet destinations with default values for extra attributes', () => {
    const mockPlanetDestinations: PlanetDestinationData[] = [
      createPlanetDestinationData({
        name: 'Mars',
        url: 'https://swapi.py4e.com/api/planets/1/',
      }),
      createPlanetDestinationData({
        terrain: 'jungle',
        population: '1023000',
      }),
    ]

    const populatedPlanetDestinations = populatePlanetDestinations(mockPlanetDestinations)

    expect(populatedPlanetDestinations).toHaveLength(2)
    expect(populatedPlanetDestinations[0]).toEqual(
      expect.objectContaining({
        id: 'https://swapi.py4e.com/api/planets/1/',
        isSelected: false,
      }),
    )
    expect(populatedPlanetDestinations[0].imageUrl).toMatch(
      new RegExp(
        `${appConfig.TRIP_DESTINATION_IMAGE_API_URL}(${destinationImagesNames.join('|')}).jpg`,
      ),
    )
    expect(populatedPlanetDestinations[1]).toEqual(
      expect.objectContaining({
        id: 'https://host:port/planets/id',
        isSelected: false,
      }),
    )
    expect(populatedPlanetDestinations[1].imageUrl).toMatch(
      new RegExp(
        `${appConfig.TRIP_DESTINATION_IMAGE_API_URL}(${destinationImagesNames.join('|')}).jpg`,
      ),
    )
  })

  it('should populate planet destination with id equals to name when url is empty string', () => {
    const mockPlanetDestinations: PlanetDestinationData[] = [
      {
        name: 'Mars',
        url: '',
        terrain: 'Rocky',
        population: '1000000000',
      },
    ]

    const populatedPlanetDestinations = populatePlanetDestinations(mockPlanetDestinations)

    expect(populatedPlanetDestinations).toHaveLength(1)
    expect(populatedPlanetDestinations[0].id).toBe('Mars')
  })
})
