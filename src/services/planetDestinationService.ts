import { appConfig } from '@/appConfig'
import { type PlanetDestinationData, type PlanetDestinationExtended } from '@/types'
import { getRandomIntegersInRange } from '@/utils'

export const destinationImagesNames = ['Skiathos', 'Gavdos', 'Naxos', 'Ios'] as const

export const planetDestinationService = () => {
  const planetImageApiUrl = new URL(appConfig.TRIP_DESTINATION_IMAGE_API_URL)

  const getRandomImageUrl = (): string => {
    const randomImage =
      destinationImagesNames[getRandomIntegersInRange(0, destinationImagesNames.length - 1)]
    const imageUrl = new URL(`${randomImage}.jpg`, planetImageApiUrl)

    return imageUrl.toString()
  }

  return {
    createPaginatedApiUrlString(page = 1, baseUrl = appConfig.TRIP_DESTINATION_API_URL): string {
      const url = new URL(baseUrl)
      url.searchParams.append('page', page.toString())

      return url.toString()
    },

    populatePlanetDestinations(
      planetDestinations: PlanetDestinationData[],
    ): PlanetDestinationExtended[] {
      return planetDestinations.map((pd) => ({
        ...pd,
        id: pd.url || pd.name,
        imageUrl: getRandomImageUrl(),
        isSelected: false,
      }))
    },
  }
}
