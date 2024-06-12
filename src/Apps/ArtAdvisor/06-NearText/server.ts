import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import {
  createUserArtworkCrossReference,
  getArtworksForConcepts,
  getClient,
  getUser,
} from "Apps/ArtAdvisor/06-NearText/lib/weaviate"
import _ from "lodash"

const ROOP_TESTER_ID = "b0fa5a51-6ab1-4576-8404-544834e521af"

const getArtworks = async (req: ArtsyRequest, res: ArtsyResponse) => {
  // const userId = req.user.id
  const userId = ROOP_TESTER_ID
  if (!userId) throw new Error("User not found")

  const user = await getUser(userId)
  const { likedArtworks, dislikedArtworks } = user
  console.log({ likedArtworks, dislikedArtworks })

  const { concepts, artworkClass } = req.query
  const artworks = await getArtworksForConcepts({
    artworkClass,
    concepts,
    limit: 10,
  })
  res.json(artworks)
}

const createArtworkLike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const userId = req.query.userId || ROOP_TESTER_ID
  const artworkId = req.query.artworkId

  console.log("liking artwork", { userId, artworkId })

  const response = await createUserArtworkCrossReference({
    userId,
    artworkId,
    referenceProperty: "likedArtworks",
  })

  console.log("createArtworkLike", { response })
  res.json(response)
}

const createArtworkDislike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const userId = req.query.userId || ROOP_TESTER_ID
  const artworkId = req.query.artworkId

  console.log("disliking artwork", { userId, artworkId })

  const response = await createUserArtworkCrossReference({
    userId,
    artworkId,
    referenceProperty: "dislikedArtworks",
  })

  console.log("createArtworkDislike", { response })
  res.json(response)
}

export const router = express.Router()

// recommended artworks
router.get("/artworks", getArtworks)

// likes
router.post("/artworks/likes", createArtworkLike)

// dislikes
router.post("/artworks/dislikes", createArtworkDislike)

// test
router.get("/test", async (req, res) => {
  const user = await getUser(ROOP_TESTER_ID)
  const options = {
    concepts: ["flower"],
    likedArtworkIds: user.likedArtworks,
    dislikedArtworkIds: user.dislikedArtworks,
    limit: 3,
  }
  console.log("getArtworksNearText", options)
  const artworks = await getArtworksNearText(options)
  const test = { user, artworks }
  res.json({ test })
})

async function getArtworksNearText(options: {
  concepts: string[]
  likedArtworkIds: string[]
  dislikedArtworkIds: string[]
  limit: number
}) {
  const conceptArray = ensureValidConcepts(options.concepts)
  const limit = options.limit || 10

  throw new Error("Need to format: " + JSON.stringify(options.likedArtworkIds))

  const client = await getClient()
  const { data } = await client.graphql
    .get()
    .withClassName("DiscoveryArtworks")
    .withNearText({
      concepts: conceptArray,
      // moveTo: getMoveObjects(options.likedArtworkIds),
      moveAwayFrom: getMoveObjects(["c7323b64-ad57-52e6-a7ae-32460df9817d"]),
    })
    .withLimit(limit)
    .withFields("internalID slug imageUrl _additional { distance }")
    .do()

  return data.Get.DiscoveryArtworks
}

/**
 * Format a list of object beacons for moveTo/moveAwayFrom
 *
 * @param ids list of object beacons.
 */
function getMoveObjects(ids: string[], force = 1) {
  const objects = ids.map(id => ({ id }))
  return { objects, force }
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
