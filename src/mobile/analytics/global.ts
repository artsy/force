const analyticsHooks = require("../lib/analytics_hooks.coffee")
const analytics = window.analytics
import { data as sd } from "sharify"
import { timeOnPageListener } from "desktop/analytics/timeOnPageListener"

//
// Analytics that occur globaly on every page. Think if there's a better place
// before you add to this file.
//

analyticsHooks.on("track", (actionName: string, data: object) => {
  analytics.track(actionName, data)
})

// Track 15 second bounce rate
timeOnPageListener()

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
