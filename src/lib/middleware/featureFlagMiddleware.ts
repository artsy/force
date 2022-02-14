import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import {
  createFeatureFlagService,
  FeatureFlagProvider,
} from "lib/featureFlags/featureFlagService"

export function featureFlagMiddleware(providerType: symbol) {
  let provider
  return (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    new Promise<FeatureFlagProvider>(async (resolve, reject) => {
      if (provider) {
        resolve(provider)
      }
      try {
        provider = await createFeatureFlagService(providerType)
        resolve(provider)
      } catch {
        reject("An unknown error occurred while creating the flag provider.")
      }
    })
      .then(provider => {
        // Create feature flag context per request
        const featureFlagContext = {
          userId: res.locals.user ? res.locals.user.id : null,
          sessionId: res.locals.sd.SESSION_ID,
        }

        // Get features and move them to sharify
        const flags = provider.getFeatures()
        res.locals.sd.featureFlags = {}
        if (flags) {
          for (let flag of flags) {
            res.locals.sd.featureFlags[flag] = provider.enabled(
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
