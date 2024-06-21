import { DiscoveryMarketingCollections } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollectionsRail"
import _ from "lodash"
import weaviate, { WeaviateClient } from "weaviate-ts-client"

const DEFAULT_MARKETING_COLLECTIONS_CLASS = "DiscoveryMarketingCollections"

export class WeaviateDB {
  private client: WeaviateClient
  private marketingCollectionClass: string

  constructor(
    options: {
      /** Weaviate host url */
      url?: string
      /** Name of marketingCollection class to use. */
      marketingCollectionClass?: string
    } = {}
  ) {
    const url = options.url || process.env.WEAVIATE_URL
    if (!url) throw new Error("Please provide url or set WEAVIATE_URL")

    this.client = weaviate.client({ host: url })
    this.marketingCollectionClass =
      options.marketingCollectionClass || DEFAULT_MARKETING_COLLECTIONS_CLASS
  }

  /**
   * Fetch artworks by semantic search on an array of concepts,
   * optionally with liked and disliked artworks to move to/away from.
   */
  async getNearMarketingCollections({
    concepts,
    budget,
    limit = 10,
  }: {
    /** List of concepts for semantic search */
    concepts: string[]
    /** Budget on which to filter */
    budget?: number
    /** List of liked artwork Mongo ids */
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

    const result = response.data.Get.DiscoveryMarketingCollections

    return result as DiscoveryMarketingCollections[]
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
