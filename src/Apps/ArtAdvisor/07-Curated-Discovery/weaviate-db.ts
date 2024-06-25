import { ArticleType } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArticlesRail"
import { DiscoveryMarketingCollections } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollectionsRail"
import {
  DiscoveryUser,
  MongoID,
} from "Apps/ArtAdvisor/07-Curated-Discovery/types"
import _ from "lodash"
import weaviate, { WeaviateClient, generateUuid5 } from "weaviate-ts-client"

const DEFAULT_MARKETING_COLLECTIONS_CLASS = "DiscoveryMarketingCollections"
const DEFAULT_ARTICLES_CLASS = "DiscoveryArticles"
const DEFAULT_USERS_CLASS = "DiscoveryUsers"

export class WeaviateDB {
  private client: WeaviateClient
  private marketingCollectionClass: string
  private articlesClass: string
  private artworksClass: string
  private userClass: string

  constructor(
    options: {
      /** Weaviate host url */
      url?: string
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
    this.marketingCollectionClass =
      options.marketingCollectionClass || DEFAULT_MARKETING_COLLECTIONS_CLASS
    this.articlesClass = options.articlesClass || DEFAULT_ARTICLES_CLASS
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
  }): Promise<DiscoveryUser | null> {
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
          ... on DiscoveryArtworks { internalID }
        }
        dislikedArtworks {
          ... on DiscoveryArtworks { internalID }
        }
        `
      )
      .do()

    if (!response.data.Get.DiscoveryUsers.length) return null

    const {
      name,
      likedArtworks,
      dislikedArtworks,
    } = response.data.Get.DiscoveryUsers[0]

    return {
      internalID, // TODO: once we create real Gravity users
      name,
      likedArtworkIds: (likedArtworks || []).map(w => w.internalID),
      dislikedArtworkIds: (dislikedArtworks || []).map(w => w.internalID),
    } as DiscoveryUser
  }

  async createUser({ name, internalID }: { name: string; internalID: string }) {
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
    reaction: "like" | "dislike"
  }) {
    // bail if user already liked or disliked artwork

    const user = await this.getUser({ internalID: userInternalID })
    if (!user) throw new Error("Weaviate user not found")

    if (user.likedArtworkIds.includes(artworkInternalID)) return false
    if (user.dislikedArtworkIds.includes(artworkInternalID)) return false

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
          .withClassName(this.artworksClass)
          .withId(artworkId)
          .payload()
      )
      .do()

    return true
  }

  /**
   * Fetch marketing collections by semantic search on an array of concepts.
   */
  async getNearMarketingCollections({
    concepts,
    budget,
    limit = 10,
  }: {
    /** List of concepts for semantic search */
    concepts: string[]
    /** Budget on which to filter collections */
    budget?: number
    /** Max number of collections to return */
    limit?: number
  }) {
    console.log("[WeaviateDB] getNearCollections", {
      concepts,
      limit,
    })

    const conceptArray = ensureValidConcepts(concepts)

    const response = await this.client.graphql
      .get()
      .withClassName(this.marketingCollectionClass)
      .withNearText({
        concepts: conceptArray,
      })
      .withLimit(limit)
      .withFields("internalID slug title imageUrl _additional { id distance }")
      .do()

    const result = response.data.Get[this.marketingCollectionClass]

    return result as DiscoveryMarketingCollections[]
  }

  /**
   * Fetch articles by semantic search on an array of concepts.
   */
  async getNearArticles({
    concepts,
    limit = 10,
  }: {
    /** List of concepts for semantic search */
    concepts: string[]
    /** Max number of articles to return */
    limit?: number
  }) {
    console.log("[WeaviateDB] getNearArticles", {
      concepts,
      limit,
    })

    const conceptArray = ensureValidConcepts(concepts)

    const response = await this.client.graphql
      .get()
      .withClassName(this.articlesClass)
      .withNearText({
        concepts: conceptArray,
      })
      .withLimit(limit)
      .withFields(
        "internalID title articleDescription href imageUrl _additional { id distance }"
      )
      .do()

    const result: ArticleType[] = response.data.Get[this.articlesClass]

    /**
     * Note: Because we return article sections, a single article can appear
     * multiple times in the results. This removes duplicates based on the
     * internalID. Order is preserved and the first occurrence is kept.
     *
     * TODO: handle better?
     */
    const dedupedResults = _.uniqBy(result, "internalID")

    return dedupedResults
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
