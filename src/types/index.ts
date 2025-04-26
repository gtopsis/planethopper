export interface PlanetDestinationData {
  name: string
  imageUrl: string
  terrain: string
  population: string
  url: string
}

export interface PlanetDestinationExtended extends Exclude<PlanetDestinationData, 'url'> {
  id: number
  isSelected: boolean
}
