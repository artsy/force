import { DiscoveryUser } from "Apps/ArtAdvisor/06-Discovery-Neartext/types"
import _ from "lodash"
import weaviate, { WeaviateClient } from "weaviate-ts-client"

export class WeaviateDB {
  private client: WeaviateClient

  constructor() {
    if (!process.env.WEAVIATE_URL) throw new Error("WEAVIATE_URL is not set")

    this.client = weaviate.client({
      host: process.env.WEAVIATE_URL,
    })
  }

  /**
   * Fetch a user
   */
  async getUser({
    internalID,
    id,
  }: {
    /** Mongo ID for Gravity User */
    internalID?: string
    /** Weaviate UUID for DiscoveryUser */
    id?: string
  }): Promise<DiscoveryUser> {
    if (!internalID && !id)
      throw new Error("Must provide either internalID or id (UUID)")

    if (internalID) throw new Error("Not implemented yet")

    if (!id) {
      // temporary, while using test users
      throw new Error("Missing id")
    }

    const response = await this.client.data
      .getterById()
      .withClassName("DiscoveryUsers")
      .withId(id)
      .do()

    const {
      internalID: _internalID,
      name,
      likedArtworks,
      dislikedArtworks,
    } = response.properties as any

    const likedArtworkUuids = likedArtworks.map(a =>
      getUUIDFromBeacon(a.beacon)
    )

    const dislikedArtworkUuids = dislikedArtworks.map(a =>
      getUUIDFromBeacon(a.beacon)
    )

    return {
      id,
      internalID: _internalID,
      name,
      likedArtworkUuids,
      dislikedArtworkUuids,
    } as DiscoveryUser
  }
}

function getUUIDFromBeacon(beacon: string) {
  const parts = beacon.split("/")
  const uuid = parts[parts.length - 1]
  if (uuid.length !== 36) throw new Error("Invalid UUID")

  return uuid
}
