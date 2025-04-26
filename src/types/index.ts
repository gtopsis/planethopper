export interface PlanetDestinationAPIResponse {
  count: number
  next: string | null
  previous: string | null
  results: PlanetDestinationExtended[] | null
}

export interface PlanetDestinationData {
  name: string
  terrain: string
  population: string
  url: string
}

export interface PlanetDestinationExtended extends Exclude<PlanetDestinationData, 'url'> {
  id: string
  imageUrl: string
  isSelected: boolean
}
