import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import {
  createFeatureFlagService,
  FeatureFlagService,
} from "lib/featureFlags/featureFlagService"

export function featureFlagMiddleware(serviceType: symbol) {
  let service
  return (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    new Promise<FeatureFlagService>(async (resolve, reject) => {
      if (service) {
        resolve(service)
      } else {
        try {
          service = await createFeatureFlagService(serviceType)
          resolve(service)
        } catch {
          reject("An unknown error occurred while creating the flag service.")
        }
      }
    })
      .then(service => {
        // Create feature flag context per request
        const featureFlagContext = {
          userId: res.locals.user ? res.locals.user.id : null,
          sessionId: res.locals.sd.SESSION_ID,
        }

        // Get features and move them to sharify
        const flags = service.getFeatures()
        res.locals.sd.featureFlags = {}
        if (flags) {
          for (let flag of flags) {
            res.locals.sd.featureFlags[flag] = service.enabled(
              flag,
              featureFlagContext
            )
          }
        }
        next()
      })
      .catch(error => {
        console.error(error)
        next()
      })
  }
}
