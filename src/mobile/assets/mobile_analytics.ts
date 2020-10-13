import { onAnalyticsReady, trackEvent } from "desktop/analytics/helpers"
import $ from "jquery"

window._ = require("underscore")
window.Cookies = require("cookies-js")
const Events = require("../../v2/Utils/Events").default

// Send Reaction events to Segment
Events.onEvent(trackEvent)

require("../analytics/before_ready")

$(() =>
  window.analytics.ready(function () {
    onAnalyticsReady()

    require("../analytics/global.ts")
    require("../analytics/show_page.js")
    require("../analytics/fairs.js")
    require("../analytics/partners.js")
  })
)
