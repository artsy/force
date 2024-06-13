type MongoID = string
type UUID = string

export type DiscoveryUser = {
  id: UUID
  internalID: MongoID
  name: string
  likedArtworkUuids: UUID[]
  dislikedArtworkUuids: UUID[]
}
