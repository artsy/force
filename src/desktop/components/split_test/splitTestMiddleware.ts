import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { updateSharifyAndContext } from "lib/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import qs from "qs"
const runningTests = require("./running_tests.coffee")
const SplitTest = require("./server_split_test.coffee")

export function splitTestMiddleware(
  req: Partial<ArtsyRequest>,
  res: Partial<ArtsyResponse>,
  next: NextFunction
) {
  for (const key in runningTests) {
    const configuration = runningTests[key]
    const name = key.toUpperCase()
    if (!res.locals.sd[name]) {
      const test = new SplitTest(req, res, configuration)
      const outcome = test.outcome()

      updateSharifyAndContext(res, name, outcome)
    }
  }

  const queryParams = req.query?.split_test

  if (queryParams) {
    const params = qs.parse(queryParams)
    for (const key in params) {
      const test = new SplitTest(req, res, runningTests[key])
      const value = params[key]
      const name = key.toUpperCase()
      test.set(value)

      updateSharifyAndContext(res, name, value)
    }
  }

  next()
}
