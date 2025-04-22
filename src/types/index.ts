export interface PlanetDestinationData {
  name: string
  imageUrl: string
  terrain: string
  population: number
  url: string
}

export interface PlanetDestinationExtended extends Exclude<PlanetDestinationData, 'url'> {
  id: number
  isSelected: boolean
}
