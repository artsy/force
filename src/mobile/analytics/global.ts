import { ActionType, OwnerType, timeOnPage } from "@artsy/cohesion"
import { data as sd } from "sharify"

const analyticsHooks = require("desktop/lib/analytics_hooks.coffee")
const analytics = window.analytics
//
// Analytics that occur globaly on every page. Think if there's a better place
// before you add to this file.
//

analyticsHooks.on("track", function (message, options) {
  analytics.track(message, options)
})
// Track 15 second bounce rate
setTimeout(function () {
  const pathname = new URL(window.location.href).pathname
  const slug = pathname.split("/")[2]
  // @ts-ignore
  const pageType = window.sd.PAGE_TYPE || pathname.split("/")[1]
  analytics.track(
    ActionType.timeOnPage,
    timeOnPage({
      contextPageOwnerSlug: slug,
      contextPageOwnerType: OwnerType[pageType],
    })
  )
}, 15000)

// Debug tracking calls
if (sd.SHOW_ANALYTICS_CALLS) {
  analytics.on("track", function () {
    console.log("TRACKED: ", arguments[0], JSON.stringify(arguments[1]))
  })
}
if (sd.SHOW_ANALYTICS_CALLS) {
  analyticsHooks.on("all", function (name, data) {
    // debugger;
    console.info("ANALYTICS HOOK: ", name, data)
  })
}
