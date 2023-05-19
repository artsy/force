import { getContextPageFromClient } from "Server/getContextPage"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { AnalyticsContextProps } from "System/Analytics/AnalyticsContext"
import { FeatureFlags } from "System/useFeatureFlag"
import { UserPreferences } from "Server/middleware/userPreferencesMiddleware"

export interface ClientContext {
  user: User
  analytics: AnalyticsContextProps
  featureFlags: FeatureFlags
  userPreferences: UserPreferences
}

export const buildClientAppContext = (
  context: { injectedData?: object } = {}
) => {
  const contextPage = getContextPageFromClient()

  if (contextPage) {
    const { pageSlug, pageType } = contextPage

    return {
      analytics: {
        contextPageOwnerSlug: pageSlug,
        contextPageOwnerType: pageType,
      },
      user: sd.CURRENT_USER,
      featureFlags: sd.FEATURE_FLAGS,
      userPreferences: sd.USER_PREFERENCES,
      ...context,
    }
  }
}
