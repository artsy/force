import {
  ArtQuizArtwork,
  ArtQuizUser,
  MongoID,
} from "Apps/ArtAdvisor/08-Art-Quiz/types"
import _ from "lodash"
import weaviate, { WeaviateClient, generateUuid5 } from "weaviate-ts-client"

const DEFAULT_ARTWORKS_CLASS = "ArtQuizArtworks"
const DEFAULT_USERS_CLASS = "ArtQuizUsers"

export class WeaviateDB {
  private client: WeaviateClient
  private artworkClass: string
  private userClass: string

  constructor(
    options: {
      /** Weaviate host url */
      url?: string
      /** Name of artwork class to use. */
      artworkClass?: string
      /** Name of marketingCollection class to use. */
      marketingCollectionClass?: string
      /** Name of articles class to use. */
      articlesClass?: string
      /** Name of user class to use. */
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
  }: {
    /** Mongo ID for Gravity User */
    internalID: string
  }): Promise<ArtQuizUser | null> {
    if (!internalID) throw new Error("Provide an internalID")

    const response = await this.client.graphql
      .get()
      .withClassName(this.userClass)
      .withWhere({
        path: ["id"],
        operator: "Equal",
        valueString: generateUuid5(internalID),
      })
      .withFields(
        `
        name
        likedArtworks {
          ... on ArtQuizArtworks { internalID }
        }
        `
      )
      .do()

    if (!response.data.Get[this.userClass].length) return null

    const { name, likedArtworks } = response.data.Get[this.userClass][0]

    return {
      internalID,
      name,
      likedArtworkIds: (likedArtworks || []).map(w => w.internalID),
    } as ArtQuizUser
  }

  async createUser({
    name,
    internalID,
  }: {
    name?: string
    internalID: string
  }) {
    const response = await this.client.data
      .creator()
      .withClassName(this.userClass)
      .withProperties({
        name,
      })
      .withId(generateUuid5(internalID))
      .do()

    console.log("[WeaviateDB] createUser", response)

    return response
  }

  /**
   * Create a liked or disliked artwork for a user
   *
   * @returns true on success, false if user already liked or disliked artwork
   */
  async reactToArtwork({
    userInternalID,
    artworkInternalID,
    reaction,
  }: {
    userInternalID: MongoID
    artworkInternalID: MongoID
    reaction: "like"
  }) {
    // error if user doesn't exist in weaviate

    let user = await this.getUser({ internalID: userInternalID })
    if (!user) {
      await this.createUser({ internalID: userInternalID })
      user = await this.getUser({ internalID: userInternalID })
    }

    // bail if user already liked artwork

    if (user?.likedArtworkIds?.includes(artworkInternalID)) return false

    // else go ahead and create

    const artworkId = generateUuid5(artworkInternalID)
    const userId = generateUuid5(userInternalID)

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
   * Fetch artworks by semantic search on an array of concepts.
   */
  async getNearObjectArtworks({
    userId,
    limit = 20,
  }: {
    /** List of Gravity Artwork IDs to exclude from the results */
    excludeArtworkIds?: string[]
    /** Gravity ID of the user */
    userId: string
    /** Max number of artworks to return */
    limit?: number
  }) {
    console.log("[WeaviateDB] getNearObjectArtworks", {
      userId,
      limit,
    })
    const user = await this.getUser({ internalID: userId })

    if (!user) throw new Error("[WeaviateDB] user not found")
    if (!this.userClass) throw new Error("Provide a userClass")

    let query = this.client.graphql
      .get()
      .withClassName(this.artworkClass)
      .withNearObject({
        beacon: getBeacon(generateUuid5(user.internalID), this.userClass),
      })
      .withLimit(limit)
      .withFields("internalID _additional { id distance }")

    console.log(
      "[WeaviateDB] getNearObjectArtworks query",
      JSON.stringify(query)
    )

    const response = await query.do()

    let filteredResponse = response.data.Get[this.artworkClass]

    const result = filteredResponse.map(artwork => {
      const properties = _.pick(artwork, ["internalID"])

      return {
        id: artwork._additional.id,
        ...properties,
        distance: artwork._additional.distance,
      }
    })

    return result as ArtQuizArtwork[]
  }
}

function getBeacon(userId: string, className: string) {
  return `weaviate://weaviate.stg.artsy.systems/${className}/${userId}`
}
