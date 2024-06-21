import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"
import { WeaviateDB } from "./weaviate-db"

const weaviateDB = new WeaviateDB()

const inferBudgetIntent = async (req: ArtsyRequest, res: ArtsyResponse) => {
  res.json({ amount: 42 })
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

router.post("/budget/intent", inferBudgetIntent)
router.get("/marketing_collections", getMarketingCollections)
