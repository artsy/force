import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import { createRelaySSREnvironment } from "v2/System/Relay/createRelaySSREnvironment"
import { getUser } from "v2/Utils/user"
import { fetchUserPreferences } from "v2/Utils/fetchUserPreferences"
import { getSupportedMetric } from "v2/Utils/metrics"

export const userPreferencesMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  if (!!req.user) {
    const user = getUser(req.user)
    const relayEnvironment = createRelaySSREnvironment({ user })
    let metric

    try {
      const { me } = await fetchUserPreferences(relayEnvironment)

      metric = me?.lengthUnitPreference
    } catch (error) {
      console.error("[Force] Error getting user preferences:", error)
    }

    if (res.locals.sd != null) {
      res.locals.sd.USER_PREFERENCES = {
        metric: getSupportedMetric(metric),
      }
    }
  }

  next()
}
