import { trackEvent } from "./helpers"
import { timeOnPage } from "@artsy/cohesion"
import { getPageTypeFromClient } from "lib/getPageType"

let interval

export const timeOnPageListener = (delay: number = 15000) => {
  if (interval) {
    clearInterval(interval)
  }

  interval = setTimeout(() => {
    const { pageType, pageSlug } = getPageTypeFromClient()
    const pathname = new URL(window.location.href).pathname

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
    const contextPageOwnerSlug = pageType === "partner" ? pathname : pageSlug

    trackEvent(
      timeOnPage({
        contextPageOwnerSlug,
        contextPageOwnerType: pageType,
      }),
      trackingOptions
    )
  }, delay)
}
