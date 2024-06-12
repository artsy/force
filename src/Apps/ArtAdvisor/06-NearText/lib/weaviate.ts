import _ from "lodash"
import weaviate, { WeaviateClient, generateUuid5 } from "weaviate-ts-client"

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

type CreateUserArtworkCrossReferenceOptions = {
  userId: string
  artworkId: string
  referenceProperty: "likedArtworks" | "dislikedArtworks"
  artworkClass?: WeaviateArtworkClass
}

export async function createUserArtworkCrossReference(
  options: CreateUserArtworkCrossReferenceOptions
) {
  const client = await getClient()

  const { userId, artworkId, referenceProperty } = options
  const artworkClass = options.artworkClass || "DiscoveryArtworks"

  const response = await client.data
    .referenceCreator()
    .withClassName("DiscoveryUsers")
    .withId(userId)
    .withReferenceProperty(referenceProperty)
    .withReference(
      client.data
        .referencePayloadBuilder()
        .withClassName(artworkClass)
        .withId(generateUuid5(artworkId))
        .payload()
    )
    .do()

  console.log("ROOP createUserArtworkCrossReference", { response })
  return response
}

type DiscoveryUser = {
  name: string
  likedArtworks: string[]
  dislikedArtworks: string[]
}

export async function getUser(userId) {
  const client = await getClient()
  const response = await client.data
    .getterById()
    .withClassName("DiscoveryUsers")
    .withId(userId)
    .do()
  return response.properties as DiscoveryUser
}
