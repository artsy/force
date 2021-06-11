import { getContextPageFromClient } from "lib/getContextPage"
import { data as sd } from "sharify"
import { AnalyticsContextProps } from "v2/System/Analytics/AnalyticsContext"
import { Mediator, mediator } from "lib/mediator"

export interface ClientContext {
  user: object
  mediator: Mediator
  analytics: AnalyticsContextProps
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
    ...context,
  }
}
