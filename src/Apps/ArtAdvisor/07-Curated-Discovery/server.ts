import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"
import { WeaviateDB } from "./weaviate-db"
import { extractBudgetIntent } from "./llm/extractBudgetIntent"
import { extractInterestsIntent } from "./llm/extractInterestsIntent"

const weaviateDB = new WeaviateDB()

const getUser = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { id } = req.params

  const user = await weaviateDB.getUser({ internalID: id })

  if (user) {
    res.json(user)
  } else {
    res.status(404).json("User not found")
  }
}

const createUser = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { name, userId } = req.body

  if (!userId) throw new Error("Provide a userId")

  const user = await weaviateDB.createUser({
    internalID: userId,
    name,
  })
  res.json(user)
}

const createArtworkLike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  let { userId, artworkId } = req.body

  if (!userId) throw new Error("Provide a userId")
  if (!artworkId) throw new Error("Provide an artworkId")

  const result = await weaviateDB.reactToArtwork({
    userInternalID: userId,
    artworkInternalID: artworkId,
    reaction: "like",
  })
  res.json(result)
}

const createArtworkDislike = async (req: ArtsyRequest, res: ArtsyResponse) => {
  let { userId, artworkId } = req.body

  if (!userId) throw new Error("Provide a userId")
  if (!artworkId) throw new Error("Provide an artworkId")

  const result = await weaviateDB.reactToArtwork({
    userInternalID: userId,
    artworkInternalID: artworkId,
    reaction: "dislike",
  })
  res.json(result)
}

const getBudgetIntent = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { budget } = req.query

  if (!budget) return res.json({})

  const intent = await extractBudgetIntent(budget)
  res.json(intent)
}

const getInterestsIntent = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { interestsFreeText } = req.query

  if (!interestsFreeText) return res.json([])

  const intent = await extractInterestsIntent(interestsFreeText)
  res.json(intent.terms || [])
}

const getArtworks = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const {
    concepts,
    excludeArtworkIds,
    priceMinUSD,
    priceMaxUSD,
    userId,
    limit,
  } = req.query

  if (!concepts) throw new Error("Provide a concepts query string parameter")

  const artworks = await weaviateDB.getNearArtworks({
    concepts: concepts as string[],
    excludeArtworkIds: excludeArtworkIds as string[],
    userId: userId as string,
    limit: limit as number,
    priceMinUSD: parseFloat(priceMinUSD),
    priceMaxUSD: parseFloat(priceMaxUSD),
  })
  res.json(artworks)
}

const getMarketingCollections = async (
  req: ArtsyRequest,
  res: ArtsyResponse
) => {
  let { concepts, budget } = req.query

  if (!concepts) throw new Error("Provide a concepts query string parameter")

  const result = await weaviateDB.getNearMarketingCollections({
    concepts: concepts as string[],
    budget: budget as number,
  })

  res.json(result)
}

const getNearArticles = async (req: ArtsyRequest, res: ArtsyResponse) => {
  let { concepts } = req.query

  if (!concepts) throw new Error("Provide a concepts query string parameter")

  const result = await weaviateDB.getNearArticles({
    concepts: concepts as string[],
  })

  res.json(result)
}

export const router = express.Router()

router.get("/articles", getNearArticles)
router.post("/artworks/dislikes", createArtworkDislike)
router.post("/artworks/likes", createArtworkLike)
router.get("/budget/intent", getBudgetIntent)
router.get("/interests/intent", getInterestsIntent)
router.get("/artworks", getArtworks)
router.get("/marketing_collections", getMarketingCollections)
router.post("/users", createUser)
router.get("/users/:id", getUser)
