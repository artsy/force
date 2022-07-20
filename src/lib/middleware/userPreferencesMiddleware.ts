import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import request from "superagent"
import { API_URL } from "config"

const DEFAULT_METRIC = "cm"

export const userPreferencesMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  if (!!req.user) {
    let metric

    try {
      const endpoint = `${API_URL}/api/v1/me`
      const headers = { "X-Access-Token": req.user.accessToken }
      const { body } = await request.get(endpoint).set(headers)
      const { length_unit_preference } = body

      metric = length_unit_preference
    } catch (error) {
      console.error("[Force] Error getting user preferences:", error)
    }

    if (res.locals.sd != null) {
      res.locals.sd.USER_PREFERENCES = {
        metric: metric || DEFAULT_METRIC,
      }
    }
  }

  next()
}
