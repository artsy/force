export type MongoID = string
export type UUID = string

export type DiscoveryUser = {
  id: UUID
  internalID: MongoID
  // properties
  name: string
  likedArtworkIds: MongoID[]
  dislikedArtworkIds: MongoID[]
}

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
