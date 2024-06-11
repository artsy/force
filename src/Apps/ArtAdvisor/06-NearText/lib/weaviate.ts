import _ from "lodash"
import weaviate, { WeaviateClient } from "weaviate-ts-client"

let weaviateClient: WeaviateClient

export async function getClient() {
  if (weaviateClient) return weaviateClient

  if (!process.env.WEAVIATE_URL) throw new Error("WEAVIATE_URL is not set")

  weaviateClient = weaviate.client({
    host: process.env.WEAVIATE_URL,
  })

  return weaviateClient
}

export type WeaviateArtworkClass =
  | "DiscoveryArtworks"
  | "DiscoveryArtworksCV"
  | "DiscoveryArtworksV2"

type GetArtworksForConceptsOptions = {
  limit: number
  concepts?: string[]
  artworkClass: WeaviateArtworkClass
}

export async function getArtworksForConcepts(
  options?: GetArtworksForConceptsOptions
) {
  const client = await getClient()

  const DEFAULTS: GetArtworksForConceptsOptions = {
    limit: 10,
    concepts: [],
    artworkClass: "DiscoveryArtworks",
  }

  let { limit, concepts, artworkClass } = _.defaults(
    options || {},
    DEFAULTS
  ) as GetArtworksForConceptsOptions

  // to avoid Weaviate errors for nearText(concepts: […]) queries,
  // ensure concepts is a nonempty array of nonempty strings
  concepts = _.reject(_.castArray(concepts), _.isEmpty)
  if (_.isEmpty(concepts)) concepts.push("random") // TODO: better default

  console.log(
    `Querying ${limit} artworks from ${artworkClass} near ${JSON.stringify(
      concepts
    )}`,
    options
  )

  const { data } = await client.graphql
    .get()
    .withClassName(artworkClass)
    .withNearText({ concepts })
    .withLimit(limit)
    .withFields("internalID slug title date rarity medium materials imageUrl")
    .do()

  return data.Get[artworkClass]
}
