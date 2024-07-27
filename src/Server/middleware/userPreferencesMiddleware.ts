import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { getUser } from "Utils/user"
import { fetchUserPreferences } from "System/Utils/fetchUserPreferences"
import { getSupportedMetric, Metric } from "Utils/metrics"
import { METAPHYSICS_ENDPOINT } from "Server/config"

export type UserPreferences = {
  metric: Metric
}

export const userPreferencesMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  let metric

  if (!!req.user) {
    try {
      const user = getUser(req.user)

      const relayEnvironment = createRelaySSREnvironment({
        user,
        // Circumvent the GraphQL proxy since this takes place during
        // express boot
        metaphysicsEndpoint: `${METAPHYSICS_ENDPOINT}/v2`,
      })

      const data = await fetchUserPreferences(relayEnvironment)

      metric = data?.me?.lengthUnitPreference
    } catch (error) {
      console.error("[Force] Error getting user preferences:", error)
    }
  }

  if (res.locals.sd != null) {
    res.locals.sd.USER_PREFERENCES = {
      metric: getSupportedMetric(metric),
    }
  }

  next()
}
