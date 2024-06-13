import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"
import { WeaviateDB } from "./weaviate-db"

const ROOP_TESTER_ID = "64724d9a-920f-4814-bf3f-bf1c45e02725"

const w = new WeaviateDB()

const getArtworks = async (req: ArtsyRequest, res: ArtsyResponse) => {
  res.json({ hello: "world " })
}

const createArtworkLike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  res.json({ hello: "world " })
}

const createArtworkDislike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  res.json({ hello: "world " })
}

export const router = express.Router()

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
    likedArtworkIds: user.likedArtworkUuids,
    dislikedArtworkIds: user.dislikedArtworkUuids,
    limit: 3,
  })

  res.json({
    like,
    dislike,
    user,
    artworks,
  })
})
