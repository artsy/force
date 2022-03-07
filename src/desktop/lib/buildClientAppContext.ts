import { getContextPageFromClient } from "lib/getContextPage"
import { data as sd } from "sharify"
import { AnalyticsContextProps } from "v2/System/Analytics/AnalyticsContext"
import { Mediator, mediator } from "lib/mediator"
import { FeatureFlags } from "v2/System/useFeatureFlag"

export interface ClientContext {
  user: User
  mediator: Mediator
  analytics: AnalyticsContextProps
  featureFlags: FeatureFlags
}

export const buildClientAppContext = (
  context: { injectedData?: object } = {}
) => {
  const { pageSlug, pageType } = getContextPageFromClient()

  return {
    analytics: {
      contextPageOwnerSlug: pageSlug,
      contextPageOwnerType: pageType,
    },
    mediator,
    user: sd.CURRENT_USER,
    featureFlags: sd.FEATURE_FLAGS,
    ...context,
  }
}
