import { trackEvent } from "./helpers"
import { timeOnPage } from "@artsy/cohesion"
import { getContextPageFromClient } from "lib/getContextPage"

let interval

export const timeOnPageListener = (delay: number = 15000) => {
  if (interval) {
    clearInterval(interval)
  }

  interval = setTimeout(() => {
    const { pageType, pageSlug, path } = getContextPageFromClient()

    const referrer = window.analytics.__artsyClientSideRoutingReferrer
    // Grab referrer from our trackingMiddleware in Reaction, since we're in a
    // single-page-app context and the value will need to be refreshed on route
    // change. See: https://github.com/artsy/force/blob/master/src/v2/Artsy/Analytics/trackingMiddleware.ts
    let trackingOptions = {}
    if (referrer) {
      trackingOptions = {
        page: {
          referrer,
        },
      }
    }
    const contextPageOwnerSlug = pageType === "partner" ? path : pageSlug

    trackEvent(
      timeOnPage({
        contextPageOwnerSlug,
        contextPageOwnerType: pageType,
      }),
      trackingOptions
    )
  }, delay)
}
