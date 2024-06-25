import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"
import { WeaviateDB } from "./weaviate-db"
import { extractBudgetIntent } from "./llm/extractBudgetIntent"

const weaviateDB = new WeaviateDB()

const getBudgetIntent = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { budget } = req.query
  const intent = await extractBudgetIntent(budget)
  res.json(intent)
}

const getArtworks = async (req: ArtsyRequest, res: ArtsyResponse) => {
  const { concepts, limit } = req.query
  const artworks = await weaviateDB.getNearArtworks({
    concepts: concepts as string[],
    limit: limit as number,
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
router.get("/budget/intent", getBudgetIntent)
router.get("/artworks", getArtworks)
router.get("/marketing_collections", getMarketingCollections)
