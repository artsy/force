const analyticsHooks = require("../lib/analytics_hooks.coffee")
const analytics = window.analytics
import { data as sd } from "sharify"

//
// Analytics that occur globaly on every page. Think if there's a better place
// before you add to this file.
//

analyticsHooks.on("track", function (message, options) {
  analytics.track(message, options)
})

// Track 15 second bounce rate
setTimeout(function () {
  analytics.track("time on page more than 15 seconds", {
    category: "15 Seconds",
    message: sd.CURRENT_PATH,
  })
}, 15000)

// Debug tracking calls
if (sd.SHOW_ANALYTICS_CALLS) {
  // FIXME: Events that trigger these events should be updated
  // or flagged for deprecation
  analytics.on("track", (actionName, data) => {
    console.info("LEGACY MOBILE ANALYTICS TRACK:", actionName, data)
  })

  analytics.on("page", function () {
    console.info("LEGACY MOBILE PAGEVIEW TRACKED: ", arguments[2], arguments[3])
  })
}
