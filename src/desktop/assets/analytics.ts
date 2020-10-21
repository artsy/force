import $ from "jquery"
import { data as sd } from "sharify"
import { onAnalyticsReady, trackEvent } from "desktop/analytics/helpers"
const setupSplitTests = require("../components/split_test/setup.coffee")
window._ = require("underscore")
window.Cookies = require("cookies-js")

// This event bus also connects to reaction's publishing event emitter because
// both piggyback on `window`. See Utils/Events for more info.
const Events = require("../../v2/Utils/Events").default

if (sd.SHOW_ANALYTICS_CALLS) {
  // Log all pageviews
  window.analytics.on("page", function () {
    console.info("ANALYTICS PAGEVIEW: ", arguments[2], arguments[3])
  })
  // Log all track calls
  window.analytics.on("track", (actionName: string, data?: any) => {
    console.info("ANALYTICS TRACK:", actionName, data)
  })
  // Log all identify calls
  window.analytics.on(
    "identify",
    (userId: string, data: object, context: any) => {
      console.info("ANALYTICS IDENTIFY:", userId, data, context)
    }
  )
}

// Send Reaction events to Segment
Events.onEvent(trackEvent)

require("../analytics/main_layout.ts")

$(() =>
  window.analytics.ready(function () {
    onAnalyticsReady()
    setupSplitTests()

    require("../analytics/artwork.js")
    require("../analytics/inquiry_questionnaire.js")
    require("../analytics/show_page.js")
  })
)
