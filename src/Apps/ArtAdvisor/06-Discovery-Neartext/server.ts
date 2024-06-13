import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"
import { WeaviateDB } from "./weaviate-db"
import { generateUuid5 } from "weaviate-ts-client"

const weaviateDB = new WeaviateDB()

const getArtworks = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { concepts, likedArtworkIds, dislikedArtworkIds, limit } = req.query
  const artworks = await weaviateDB.getArtworksNearConcepts({
    concepts: concepts as string[],
    likedArtworkIds: likedArtworkIds as string[],
    dislikedArtworkIds: dislikedArtworkIds as string[],
    limit: limit as number,
  })
  res.json(artworks)
}

const getUsers = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const users = await weaviateDB.getUsers()
  res.json(users)
}

const getUser = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { id } = req.params // assumed to be UUID
  const user = await weaviateDB.getUser({ id })
  res.json(user)
}

const createArtworkLike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  let { userId, userInternalID, artworkId } = req.body
  if (userInternalID) {
    userId = generateUuid5(userInternalID)
  }
  if (!userId) throw new Error("Provide either userId (UUID) or userInternalID")

  const result = await weaviateDB.reactToArtwork({
    userId,
    artworkInternalID: artworkId,
    reaction: "like",
  })
  res.json(result)
}

const createArtworkDislike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  let { userId, userInternalID, artworkId } = req.body
  if (userInternalID) {
    userId = generateUuid5(userInternalID)
  }
  if (!userId) throw new Error("Provide either userId (UUID) or userInternalID")

  const result = await weaviateDB.reactToArtwork({
    userId,
    artworkInternalID: artworkId,
    reaction: "dislike",
  })
  res.json(result)
}

export const router = express.Router()

router.get("/users", getUsers)
router.get("/users/:id", getUser)
router.get("/artworks", getArtworks)
router.post("/artworks/likes", createArtworkLike)
router.post("/artworks/dislikes", createArtworkDislike)

router.get("/test", async (req: ArtsyRequest, res: ArtsyResponse) => {
  const TEST_ID = "64724d9a-920f-4814-bf3f-bf1c45e02725"

  const like = await weaviateDB.reactToArtwork({
    artworkInternalID: "662fa0a76db981000e0725ff",
    userId: TEST_ID,
    reaction: "like",
  })
  const dislike = await weaviateDB.reactToArtwork({
    artworkInternalID: "66266a4b1275a600124aeba8",
    userId: TEST_ID,
    reaction: "dislike",
  })

  const user = await weaviateDB.getUser({ id: TEST_ID })

  const artworks = await weaviateDB.getArtworksNearConcepts({
    concepts: ["flower"],
    likedArtworkIds: user.likedArtworkIds,
    dislikedArtworkIds: user.dislikedArtworkIds,
    limit: 3,
  })

  const users = await weaviateDB.getUsers()

  res.json({
    like,
    dislike,
    user,
    artworks,
    users,
  })
})
