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

  async getUsers() {
    const response = await this.client.graphql
      .get()
      .withClassName(this.userClass)
      .withFields("name _additional { id }")
      .do()

    const users = response.data.Get.DiscoveryUsers.map(user => {
      return {
        id: user._additional.id,
        name: user.name,
      }
    })

    return users
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

    const response = await this.client.graphql
      .get()
      .withClassName(this.userClass)
      .withWhere({
        path: ["id"],
        operator: "Equal",
        valueString: id,
      })
      .withFields(
        `
        name
        likedArtworks {
          ... on DiscoveryArtworks { internalID }
        }
        dislikedArtworks {
          ... on DiscoveryArtworks { internalID }
        }
        `
      )
      .do()

    const {
      name,
      likedArtworks,
      dislikedArtworks,
    } = response.data.Get.DiscoveryUsers[0]

    return {
      id,
      // internalID, // TODO: once we create real Gravity users
      name,
      likedArtworkIds: (likedArtworks || []).map(w => w.internalID),
      dislikedArtworkIds: (dislikedArtworks || []).map(w => w.internalID),
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
    if (user.likedArtworkIds.includes(artworkInternalID)) return false
    if (user.dislikedArtworkIds.includes(artworkInternalID)) return false

    // else go ahead and create

    const artworkId = generateUuid5(artworkInternalID)

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
    /** List of liked artwork Mongo ids */
    likedArtworkIds?: MongoID[]
    /** List of liked artwork Mongo ids */
    dislikedArtworkIds?: MongoID[]
    /** Max number of artworks to return */
    limit?: number
  }) {
    console.log("[WeaviateDB] getArtworksNearConcepts", {
      concepts,
      likedArtworkIds,
      dislikedArtworkIds,
      limit,
    })

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
 * Format a list of Mongo IDs for moveTo/moveAwayFrom
 *
 * @param ids list of Mongo IDs
 * @param force weight of the move
 */
function getMoveObjects(ids: MongoID[], force = 1) {
  const objects = _.castArray(ids).map(id => ({ id: generateUuid5(id), force }))
  return { objects, force }
}
