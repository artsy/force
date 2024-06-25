import { ArticleType } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArticlesRail"
import { DiscoveryArtwork } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArtworksRail"
import { DiscoveryMarketingCollections } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollectionsRail"
import _ from "lodash"
import weaviate, { WeaviateClient } from "weaviate-ts-client"

const DEFAULT_ARTWORKS_CLASS = "DiscoveryArtworks"
const DEFAULT_MARKETING_COLLECTIONS_CLASS = "DiscoveryMarketingCollections"
const DEFAULT_ARTICLES_CLASS = "DiscoveryArticles"

export class WeaviateDB {
  private client: WeaviateClient
  private artworkClass: string
  private marketingCollectionClass: string
  private articlesClass: string

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
    } = {}
  ) {
    const url = options.url || process.env.WEAVIATE_URL
    if (!url) throw new Error("Please provide url or set WEAVIATE_URL")

    this.client = weaviate.client({ host: url })
    this.artworkClass = options.artworkClass || DEFAULT_ARTWORKS_CLASS
    this.marketingCollectionClass =
      options.marketingCollectionClass || DEFAULT_MARKETING_COLLECTIONS_CLASS
    this.articlesClass = options.articlesClass || DEFAULT_ARTICLES_CLASS
  }

  /**
   * Fetch artworks by semantic search on an array of concepts.
   */
  async getNearArtworks({
    concepts,
    limit = 10,
  }: {
    /** List of concepts for semantic search */
    concepts: string[]
    /** Max number of artworks to return */
    limit?: number
  }) {
    console.log("[WeaviateDB] getArtworksNearConcepts", {
      concepts,
      limit,
    })

    const conceptArray = ensureValidConcepts(concepts)

    const response = await this.client.graphql
      .get()
      .withClassName(this.artworkClass)
      .withNearText({
        concepts: conceptArray,
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
