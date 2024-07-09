export type MongoID = string
export type UUID = string

export type ArtQuizUser = {
  id: UUID
  internalID: MongoID
  // properties
  name: string
  likedArtworkIds: MongoID[]
  dislikedArtworkIds: MongoID[]
}

export type ArtQuizArtwork = {
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
