import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import {
  createFeatureFlagService,
  FeatureFlagService,
} from "Server/featureFlags/featureFlagService"
import { FeatureFlags } from "System/Hooks/useFeatureFlag"
import { updateSharifyAndContext } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"

export function featureFlagMiddleware(serviceType: symbol) {
  let service: FeatureFlagService

  return (_req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    new Promise<FeatureFlagService>(async (resolve, reject) => {
      if (service) {
        resolve(service)
      } else {
        try {
          service = await createFeatureFlagService(serviceType)
          resolve(service)
        } catch (error) {
          reject(error)
        }
      }
    })
      .then(service => {
        // Create feature flag context per request
        const featureFlagContext = {
          userId: res.locals.user ? res.locals.user.id : null,
          sessionId: res.locals.sd.SESSION_ID,
        }

        // Get features and variants and move them to sharify
        const flags = service.getFeatures()

        const featureFlags = flags.reduce((acc: FeatureFlags, flag) => {
          return {
            ...acc,
            [flag]: {
              flagEnabled: service.enabled(flag, featureFlagContext),
              variant: service.getVariant(flag, featureFlagContext),
            },
          }
        }, {})

        updateSharifyAndContext(res, "FEATURE_FLAGS", featureFlags)

        next()
      })
      .catch(error => {
        console.error("[Force] Error creating feature flag service:", error)
        res.locals.sd.FEATURE_FLAGS = {}
        next()
      })
  }
}

export function createFeatureFlagsCachePrefix(
  featureFlags: FeatureFlags
): string {
  const flagsEnabledList: string[] = []

  for (const key in featureFlags) {
    if (featureFlags[key].flagEnabled) {
      flagsEnabledList.push(`${key}:${featureFlags[key].variant.name}`)
    }
  }

  return flagsEnabledList.join("|")
}
