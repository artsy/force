import type { FeatureFlags } from "System/Hooks/useFeatureFlag"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

export interface ClientContext {
  user: User
  featureFlags: FeatureFlags
}

export const getClientAppContext = (
  context: { injectedData?: object } = {},
): ClientContext => {
  return {
    user: sd.CURRENT_USER,
    featureFlags: sd.FEATURE_FLAGS,
    ...context,
  }
}
