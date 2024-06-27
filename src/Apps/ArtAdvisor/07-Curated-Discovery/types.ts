export type MongoID = string
export type UUID = string

export type DiscoveryArtwork = {
  id: UUID
  internalID: MongoID
  // properties
  slug: string
  title: string
  date: string
  rarity: string
  medium: string
  materials: string
  price: string
  dimensions: string
  imageUrl: string
}
