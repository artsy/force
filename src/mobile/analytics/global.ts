const analyticsHooks = require("../lib/analytics_hooks.coffee")
const analytics = window.analytics
import { data as sd } from "sharify"
import { OwnerType, timeOnPage } from "@artsy/cohesion"
import { trackEvent } from "desktop/analytics/helpers"

//
// Analytics that occur globaly on every page. Think if there's a better place
// before you add to this file.
//

analyticsHooks.on("track", (actionName: string, data: object) => {
  analytics.track(actionName, data)
})

// Track 15 second bounce rate
setTimeout(() => {
  const pathname = new URL(window.location.href).pathname
  const slug = pathname.split("/")[2]
  // @ts-ignore
  const pageType = window.sd.PAGE_TYPE || pathname.split("/")[1]

  const contextPageOwnerSlug = pageType === "partner" ? pathname : slug

  trackEvent(
    timeOnPage({
      contextPageOwnerSlug,
      contextPageOwnerType: OwnerType[pageType],
    })
  )
}, 15000)

// Debug tracking calls
if (sd.SHOW_ANALYTICS_CALLS) {
  // FIXME: Events that trigger these events should be updated
  // or flagged for deprecation
  analytics.on("track", (actionName: string, data: object) => {
    console.info("LEGACY MOBILE ANALYTICS TRACK:", actionName, data)
  })

  analytics.on("page", function () {
    console.info("LEGACY MOBILE PAGEVIEW TRACKED: ", arguments[2], arguments[3])
  })
}
