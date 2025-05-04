import { appConfig } from '@/appConfig'
import { type PlanetDestinationData, type PlanetDestinationExtended } from '@/types'
import { getRandomIntegerInRange } from '@/utils/shared'

export const destinationImagesNames = ['Skiathos', 'Gavdos', 'Naxos', 'Ios'] as const
const planetImageApiUrl = new URL(appConfig.TRIP_DESTINATION_IMAGE_API_URL)

const getIdFromUrl = (url: string): string | null => {
  const id = url.split('/').filter(Boolean).pop()

  return id && id != '' ? id : null
}

const createRandomImageUrl = (): string => {
  const randomImage =
    destinationImagesNames[getRandomIntegerInRange(0, destinationImagesNames.length - 1)]
  const imageUrl = new URL(`${randomImage}.jpg`, planetImageApiUrl)

  return imageUrl.toString()
}

export const createPaginatedApiUrlString = (
  page = 1,
  baseUrl = appConfig.TRIP_DESTINATION_API_URL,
): string => {
  const url = new URL(baseUrl)
  url.searchParams.append('page', page.toString())

  return url.toString()
}

export const populatePlanetDestinations = (
  planetDestinations: PlanetDestinationData[],
): PlanetDestinationExtended[] => {
  return planetDestinations.map((pd) => ({
    ...pd,
    id: getIdFromUrl(pd.url) || pd.name,
    imageUrl: createRandomImageUrl(),
    isSelected: false,
  }))
}
