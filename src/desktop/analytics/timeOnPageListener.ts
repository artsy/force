import { trackEvent } from "./helpers"
import { OwnerType, timeOnPage } from "@artsy/cohesion"

export const timeOnPageListener = (delay: number = 15000) => {
  setTimeout(() => {
    const pathname = new URL(window.location.href).pathname
    const slug = pathname.split("/")[2]
    const pageType = window.sd.PAGE_TYPE || pathname.split("/")[1]
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
    const contextPageOwnerSlug = pageType === "partner" ? pathname : slug

    trackEvent(
      timeOnPage({
        contextPageOwnerSlug,
        contextPageOwnerType: OwnerType[pageType],
      }),
      trackingOptions
    )
  }, delay)
}
