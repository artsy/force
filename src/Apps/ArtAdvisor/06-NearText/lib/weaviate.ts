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

export async function getArtworksForUser({
  userId,
  limit,
}: {
  userId: string
  limit: number
}) {
  const client = await getClient()
  const concepts = await getConceptsForUser(userId)
  const { data } = await client.graphql
    .get()
    .withClassName("DiscoveryArtworks")
    .withNearText({ concepts })
    .withLimit(limit)
    .withFields("internalID slug title date rarity medium materials imageUrl")
    .do()

  return data.Get.DiscoveryArtworks
}

export async function getConceptsForUser(userId: string) {
  return ["street art", "graffiti"]
}
