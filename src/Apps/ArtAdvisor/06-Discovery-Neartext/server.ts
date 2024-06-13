import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"
import { WeaviateDB } from "./weaviate-db"
import { generateUuid5 } from "weaviate-ts-client"

const ROOP_TESTER_ID = "64724d9a-920f-4814-bf3f-bf1c45e02725"

const w = new WeaviateDB()

const getArtworks = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { concepts, likedArtworkIds, dislikedArtworkIds, limit } = req.query
  const artworks = await w.getArtworksNearConcepts({
    concepts: concepts as string[],
    likedArtworkIds: likedArtworkIds as string[],
    dislikedArtworkIds: dislikedArtworkIds as string[],
    limit: limit as number,
  })
  res.json(artworks)
}

const getUsers = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const users = await w.getUsers()
  res.json(users)
}

const createArtworkLike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  let { userId, userInternalID, artworkId } = req.body
  if (userInternalID) {
    userId = generateUuid5(userInternalID)
  }
  if (!userId) throw new Error("Provide either userId (UUID) or userInternalID")

  const result = await w.reactToArtwork({
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

  const result = await w.reactToArtwork({
    userId,
    artworkInternalID: artworkId,
    reaction: "dislike",
  })
  res.json(result)
}

export const router = express.Router()

router.get("/users", getUsers)
router.get("/artworks", getArtworks)
router.post("/artworks/likes", createArtworkLike)
router.post("/artworks/dislikes", createArtworkDislike)

router.get("/test", async (req: ArtsyRequest, res: ArtsyResponse) => {
  const like = await w.reactToArtwork({
    artworkInternalID: "662fa0a76db981000e0725ff",
    userId: ROOP_TESTER_ID,
    reaction: "like",
  })
  const dislike = await w.reactToArtwork({
    artworkInternalID: "66266a4b1275a600124aeba8",
    userId: ROOP_TESTER_ID,
    reaction: "dislike",
  })

  const user = await w.getUser({ id: ROOP_TESTER_ID })

  const artworks = await w.getArtworksNearConcepts({
    concepts: ["flower"],
    likedArtworkIds: user.likedArtworkIds,
    dislikedArtworkIds: user.dislikedArtworkIds,
    limit: 3,
  })

  const users = await w.getUsers()

  res.json({
    like,
    dislike,
    user,
    artworks,
    users,
  })
})
