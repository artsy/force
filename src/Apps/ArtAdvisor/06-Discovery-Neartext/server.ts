import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"

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
