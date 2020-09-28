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

if (sd.SHOW_ANALYTICS_CALLS) {
  // Log all track calls
  window.analytics.on("track", (actionName: string, data?: any) => {
    // eslint-disable-next-line no-console
    console.info("MOBILE ANALYTICS TRACK:", actionName, data)
  })
  // Log all pageviews
  window.analytics.on("page", function () {
    // eslint-disable-next-line no-console
    console.info("MOBILE ANALYTICS PAGEVIEW: ", arguments[2], arguments[3])
  })
}
