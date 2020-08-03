import $ from "jquery"
import { data as sd } from "sharify"
import { extend, pick } from "lodash"
import { trackEvent } from "desktop/analytics/helpers"
const analyticsHooks = require("../lib/analytics_hooks.coffee")
const mediator = require("../lib/mediator.coffee")
const setupSplitTests = require("../components/split_test/setup.coffee")
window._ = require("underscore")
window.Cookies = require("cookies-js")

// This event bus also connects to reaction's publishing event emitter because
// both piggyback on `window`. See Utils/Events for more info.
const Events = require("../../v2/Utils/Events").default

// All Force mediator events can be hooked into for tracking purposes
mediator.on("all", (actionName: string, data?: object) =>
  analyticsHooks.trigger(`mediator:${actionName}`, data)
)

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
    if (sd.CURRENT_USER != null ? sd.CURRENT_USER.id : undefined) {
      const allowedlist = [
        "collector_level",
        "default_profile_id",
        "email",
        "id",
        "name",
        "phone",
        "type",
      ]
      const traits = extend(pick(sd.CURRENT_USER, allowedlist), {
        session_id: sd.SESSION_ID,
      })
      window.analytics.identify(sd.CURRENT_USER.id, traits, {
        integrations: { Marketo: false },
      })
      // clear analytics cache when user logs out
      analyticsHooks.on("auth:logged-out", () => window.analytics.reset())
    }

    setupSplitTests()

    require("../analytics/global.js")
    require("../analytics/articles.js")
    require("../analytics/article_impressions.js")
    require("../analytics/partner_application.js")
    require("../analytics/artworks_filter.js")
    require("../analytics/artist_page.js")
    require("../analytics/home.js")
    require("../analytics/contact.js")
    require("../analytics/show_page.js")
    require("../analytics/account_creation.js")
    require("../analytics/account_login.js")
    require("../analytics/bidding.js")
    require("../analytics/collect.js")
    require("../analytics/consignments.js")
    require("../analytics/notifications.js")
    require("../analytics/artists.js")
    require("../analytics/artwork.js")
    require("../analytics/fair.js")
    require("../analytics/following.js")
    require("../analytics/follow_widget.js")
    require("../analytics/genes.js")
    require("../analytics/partner.js")
    require("../analytics/checkout.js")
    require("../analytics/personalize.js")
    require("../analytics/search.js")
    require("../analytics/auth.js")
    require("../analytics/layered_search.js")
    require("../analytics/artwork_rail.js")
    require("../analytics/galleries.js")
    require("../analytics/recently_viewed_artworks.js")
    require("../analytics/save.js")
    require("../analytics/embedded_inquiry.js")
    require("../analytics/inquiry_questionnaire.js")
  })
)
