import weaviate, { WeaviateClient } from "weaviate-ts-client"

export async function createReference(args: {
  fromClassName: "DiscoveryUsers"
  fromWeaviateId: string
  toClassName: "DiscoveryArtworks"
  toWeaviateId: string
  referenceProperty: "likedArtworks" | "dislikedArtworks"
}) {
  const {
    fromClassName,
    fromWeaviateId,
    toClassName,
    referenceProperty,
    toWeaviateId,
  } = args

  try {
    const client = await getClient()

    await client.data
      .referenceCreator()
      .withClassName(fromClassName)
      .withId(fromWeaviateId)
      .withReferenceProperty(referenceProperty)
      .withReference(
        client.data
          .referencePayloadBuilder()
          .withClassName(toClassName)
          .withId(toWeaviateId)
          .payload()
      )
      .do()
  } catch (e) {
    console.error("[Force] Error creating reference", e)
  }
}

export async function getObjectWithId(args: {
  objectId: string
  query: string
  className: "DiscoveryUsers"
}) {
  const { objectId, query, className } = args

  try {
    const client = await getClient()

    return await client.graphql
      .get()
      .withClassName(className)
      .withFields(query)
      .withWhere({
        operator: "Equal",
        path: ["id"],
        valueText: objectId,
      })
      .do()
  } catch (e) {
    console.error("[Force] Error getting weaviate object with id", e)
  }
}

export async function getNearObjects(args: {
  objectId: string
  objectClassName: "DiscoveryUsers"
  targetClassName: "DiscoveryArtworks"
  query: string
  limit: number
}) {
  const { objectId, objectClassName, targetClassName, query, limit } = args

  try {
    const client = await getClient()

    return await client.graphql
      .get()
      .withClassName(targetClassName)
      .withFields(query)
      .withNearObject({
        beacon: generateBeacon(objectId, objectClassName),
      })
      .withLimit(limit)
      .do()
  } catch (e) {
    console.error("[Force] Error getting weaviate nearObjects ", e)
  }
}

export async function getObjects(args: {
  className: "DiscoveryArtworks" | "DiscoveryUsers"
  query: string
  limit: number
}) {
  const { limit, className, query } = args

  try {
    const client = await getClient()

    return await client.graphql
      .get()
      .withClassName(className)
      .withFields(query)
      .withLimit(limit)
      .do()
  } catch (e) {
    console.error("[Force] Error getting weaviate objects", e)
  }
}

function generateBeacon(userId: string, className: string) {
  return `weaviate://weaviate.stg.artsy.systems/${className}/${userId}`
}

function getClient(): Promise<WeaviateClient> {
  let client

  try {
    if (!process.env.WEAVIATE_URL) {
      throw new Error("WEAVIATE_URL environment variable is not set")
    }

    client = weaviate.client({
      host: process.env.WEAVIATE_URL,
    })
  } catch (e) {
    console.error("[Force] Error creating weaviate client: ", e)
  }
  return client
}
