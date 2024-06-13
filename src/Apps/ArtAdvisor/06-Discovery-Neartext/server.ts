import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"
import { WeaviateDB } from "./weaviate-db"

const ROOP_TESTER_ID = "b0fa5a51-6ab1-4576-8404-544834e521af"

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
  const w = new WeaviateDB()

  const user = await w.getUser({ id: ROOP_TESTER_ID })

  const like = await w.reactToArtwork({
    artworkInternalID: "662fa0a76db981000e0725ff",
    userId: ROOP_TESTER_ID,
    reaction: "like",
  })
  const dislike = await w.reactToArtwork({
    artworkInternalID: "660ecffeb7efdb000e8bb024",
    userId: ROOP_TESTER_ID,
    reaction: "dislike",
  })

  res.json({
    user,
    like,
    dislike,
  })
})
