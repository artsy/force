// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { FeatureFlags } from "System/Hooks/useFeatureFlag"
import { UserPreferences } from "Server/middleware/userPreferencesMiddleware"

export interface ClientContext {
  user: User
  featureFlags: FeatureFlags
  userPreferences: UserPreferences
}

export const getClientAppContext = (
  context: { injectedData?: object } = {}
): ClientContext => {
  return {
    user: sd.CURRENT_USER,
    featureFlags: sd.FEATURE_FLAGS,
    userPreferences: sd.USER_PREFERENCES,
    ...context,
  }
}
