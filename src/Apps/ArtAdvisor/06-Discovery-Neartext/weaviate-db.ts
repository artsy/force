import {
  DiscoveryArtwork,
  DiscoveryUser,
  MongoID,
  UUID,
} from "Apps/ArtAdvisor/06-Discovery-Neartext/types"
import _ from "lodash"
import weaviate, { WeaviateClient, generateUuid5 } from "weaviate-ts-client"

const DEFAULT_ARTWORKS_CLASS = "DiscoveryArtworks"
const DEFAULT_USERS_CLASS = "DiscoveryUsers"

export class WeaviateDB {
  private client: WeaviateClient
  private artworkClass: string
  private userClass: string

  constructor(
    options: {
      /** Weaviate host url */
      url?: string
      /** Name of artwork class to use.
       * Be sure this class maps to the likes/dislikes of the
       * user class that is being supplied here.
       */
      artworkClass?: string
      /** Name of user class to use.
       * Be sure this class's likes/dislikes are mapped to the
       * same artwork class that is being supplied here.
       */
      userClass?: string
    } = {}
  ) {
    const url = options.url || process.env.WEAVIATE_URL
    if (!url) throw new Error("Please provide url or set WEAVIATE_URL")

    this.client = weaviate.client({ host: url })
    this.artworkClass = options.artworkClass || DEFAULT_ARTWORKS_CLASS
    this.userClass = options.userClass || DEFAULT_USERS_CLASS
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
      .withClassName(this.userClass)
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

  /**
   * Create a liked or disliked artwork for a user
   *
   * @returns true on success, false if user already liked or disliked artwork
   */
  async reactToArtwork({
    userId,
    userInternalID,
    artworkInternalID,
    reaction,
  }: {
    userId?: UUID
    userInternalID?: MongoID
    artworkInternalID: MongoID
    reaction: "like" | "dislike"
  }) {
    if (userInternalID) {
      userId = generateUuid5(userInternalID)
    }
    if (!userId)
      throw new Error("Provide either userId (UUID) or userInternalID")

    // bail if user already liked or disliked artwork

    const user = await this.getUser({ id: userId })
    const artworkId = generateUuid5(artworkInternalID)

    if (user.likedArtworkUuids.includes(artworkId)) return false
    if (user.dislikedArtworkUuids.includes(artworkId)) return false

    // else go ahead and create

    const referenceProperty = {
      like: "likedArtworks",
      dislike: "dislikedArtworks",
    }[reaction]

    await this.client.data
      .referenceCreator()
      .withClassName(this.userClass)
      .withId(userId)
      .withReferenceProperty(referenceProperty)
      .withReference(
        this.client.data
          .referencePayloadBuilder()
          .withClassName(this.artworkClass)
          .withId(artworkId)
          .payload()
      )
      .do()

    return true
  }

  /**
   * Fetch artworks by semantic search on an array of concepts,
   * optionally with liked and disliked artworks to move to/away from.
   */
  async getArtworksNearConcepts({
    concepts,
    likedArtworkIds = [],
    dislikedArtworkIds = [],
    limit = 10,
  }: {
    /** List of concepts for semantic search */
    concepts: string[]
    /** List of liked artwork UUIDs */
    likedArtworkIds?: UUID[]
    /** List of liked artwork UUIDs */
    dislikedArtworkIds?: UUID[]
    /** Max number of artworks to return */
    limit?: number
  }) {
    const conceptArray = ensureValidConcepts(concepts)

    const response = await this.client.graphql
      .get()
      .withClassName(this.artworkClass)
      .withNearText({
        concepts: conceptArray,
        moveTo: getMoveObjects(likedArtworkIds),
        moveAwayFrom: getMoveObjects(dislikedArtworkIds),
      })
      .withLimit(limit)
      .withFields(
        "internalID slug title date rarity medium materials price dimensions imageUrl _additional { id distance }"
      )
      .do()

    const result = response.data.Get.DiscoveryArtworks.map(artwork => {
      const properties = _.pick(artwork, [
        "internalID",
        "slug",
        "title",
        "date",
        "rarity",
        "medium",
        "materials",
        "price",
        "dimensions",
        "imageUrl",
      ])

      return {
        id: artwork._additional.id,
        ...properties,
        distance: artwork._additional.distance,
      }
    })

    return result as DiscoveryArtwork[]
  }
}

function getUUIDFromBeacon(beacon: string) {
  const parts = beacon.split("/")
  const uuid = parts[parts.length - 1]
  if (uuid.length !== 36) throw new Error("Invalid UUID")

  return uuid
}

/**
 * Ensure that the concepts are valid for nearText(concepts: […])
 * queries, to avoid Weaviate errors.
 *
 * @returns a non-empty array of non-empty strings
 */
function ensureValidConcepts(concepts: string[]) {
  let conceptsArray = _.castArray(concepts)
  conceptsArray = _.reject(conceptsArray, _.isEmpty)

  if (_.isEmpty(conceptsArray)) {
    conceptsArray.push("art") // TODO: better default?
  }

  return conceptsArray
}

/**
 * Format a list of Weaviate object UUIDs for moveTo/moveAwayFrom
 *
 * @param ids list of object UUIDs
 * @param force weight of the move
 */
function getMoveObjects(ids: UUID[], force = 1) {
  const objects = ids.map(id => ({ id }))
  return { objects, force }
}
