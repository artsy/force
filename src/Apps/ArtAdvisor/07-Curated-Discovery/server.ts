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

export const router = express.Router()

router.get("/budget/intent", getBudgetIntent)
router.get("/marketing_collections", getMarketingCollections)
