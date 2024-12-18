import { getAppPreferences } from "Apps/AppPreferences/appPreferencesServerRoutes"
import { APP_PREFERENCES_SHARIFY_KEY } from "Apps/AppPreferences/useAppPreferences"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import { updateSharifyAndContext } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import type { NextFunction } from "express"

export const appPreferencesMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  const preferences = getAppPreferences(req)
  updateSharifyAndContext(res, APP_PREFERENCES_SHARIFY_KEY, preferences)
  next()
}
