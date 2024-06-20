import express from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import _ from "lodash"

const inferBudgetIntent = async (req: ArtsyRequest, res: ArtsyResponse) => {
  res.json({ amount: 42 })
}

export const router = express.Router()

router.post("/budget/intent", inferBudgetIntent)
