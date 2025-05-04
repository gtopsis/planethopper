import { appConfig } from '@/appConfig'
import { type PlanetDestinationData, type PlanetDestinationExtended } from '@/types'
import { getRandomIntegerInRange } from '@/utils/shared'

export const destinationImagesNames = ['Skiathos', 'Gavdos', 'Naxos', 'Ios'] as const

export const planetDestinationService = () => {
  const planetImageApiUrl = new URL(appConfig.TRIP_DESTINATION_IMAGE_API_URL)

  const generateIdFromUrl = (url: string): string | null => {
    const id = url.split('/').filter(Boolean).pop()

    return id && id != '' ? id : null
  }

  const getRandomImageUrl = (): string => {
    const randomImage =
      destinationImagesNames[getRandomIntegerInRange(0, destinationImagesNames.length - 1)]
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
        id: generateIdFromUrl(pd.url) || pd.name,
        imageUrl: getRandomImageUrl(),
        isSelected: false,
      }))
    },
  }
}
