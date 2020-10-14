import { getPageTypeFromClient } from "lib/getPageType"
import { data as sd } from "sharify"
import { AnalyticsContextProps } from "v2/Artsy/Analytics/AnalyticsContext"
import { Mediator } from "v2/Artsy/SystemContext"
const mediator = require("desktop/lib/mediator.coffee")

export interface ClientContext {
  user: object
  mediator: Mediator
  analytics: AnalyticsContextProps
}

export const buildClientAppContext = (
  context: { injectedData?: object } = {}
) => {
  const { pageSlug, pageType } = getPageTypeFromClient()

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
