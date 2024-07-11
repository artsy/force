import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"
import { WeaviateDB } from "./weaviate-db"

const weaviateClient = new WeaviateDB()

const getUser = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { id } = req.params

  const user = await weaviateClient.getUser({ internalID: id })

  if (user) {
    res.json(user)
  } else {
    res.status(404).json("User not found")
  }
}

const createUser = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { name, userId } = req.body

  if (!userId) throw new Error("Provide a userId")

  const user = await weaviateClient.createUser({
    internalID: userId,
    name,
  })
  res.json(user)
}

const createArtworkLike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  let { userId, artworkId } = req.body

  if (!userId) throw new Error("Provide a userId")
  if (!artworkId) throw new Error("Provide an artworkId")

  const result = await weaviateClient.reactToArtwork({
    userInternalID: userId,
    artworkInternalID: artworkId,
    reaction: "like",
  })
  res.json(result)
}

const getQuizResults = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { userId, limit } = req.query

  const artworks = await weaviateClient.getNearObjectArtworks({
    userInternalID: userId as string,
    limit: limit as number,
  })
  res.json(artworks)
}

export const router = express.Router()

router.post("/artworks/likes", createArtworkLike)
router.post("/artworks/dislikes", createArtworkLike)
router.get("/artworks/quiz_results", getQuizResults)
router.post("/users", createUser)
router.get("/users/:id", getUser)
