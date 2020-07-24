import $ from "jquery"
import { data as sd } from "sharify"
import { extend, omit, pick } from "lodash"
const analyticsHooks = require("../lib/analytics_hooks.coffee")
const mediator = require("../lib/mediator.coffee")
const setupSplitTests = require("../components/split_test/setup.coffee")
window._ = require("underscore")
window.Cookies = require("cookies-js")
const { analytics } = window

// This event bus also connects to reaction's publishing event emitter because
// both piggyback on `window`. See Utils/Events for more info.
const Events = require("../../v2/Utils/Events").default

// All Force mediator events can be hooked into for tracking purposes
mediator.on("all", (name, data) =>
  analyticsHooks.trigger(`mediator:${name}`, data)
)

const trackEvent = function (data) {
  // TODO: This is old schema
  if (data.action) {
    // Send Reaction's read more as a page view
    if (data.action === "Clicked read more") {
      const pathname = data.pathname || location.pathname
      const href = sd.APP_URL + "/" + pathname
      analytics.page({ path: pathname }, { integrations: { Marketo: false } })
      if (window.PARSELY) {
        window.PARSELY.beacon.trackPageView({
          url: href,
          js: 1,
          action_name: "infinite",
        })
      }
      if (window.Sailthru) {
        window.Sailthru.track({
          domain: "horizon.artsy.net",
          spider: true,
          track_url: true,
          url: href,
          use_stored_tags: true,
        })
      }

      // Return early because we don't want to make a Segment call for read more
      return
    }

    analytics.track(data.action, omit(data, "action"))
  } else if (data.action_type) {
    // New analytics schema
    const trackingData = omit(data, "action_type")
    let trackingOptions = {}

    const referrer = analytics.__artsyClientSideRoutingReferrer
    // Grab referrer from our trackingMiddleware in Reaction, since we're in a
    // single-page-app context and the value will need to be refreshed on route
    // change. See: https://github.com/artsy/reaction/blob/master/src/Artsy/Analytics/trackingMiddleware.ts
    if (referrer) {
      trackingOptions = {
        page: {
          referrer,
        },
      }
    }

    analytics.track(data.action_type, trackingData, trackingOptions)
  } else {
    console.error(
      `Unknown analytics schema being used: ${JSON.stringify(data)}`
    )
  }
}

// All Reaction events are sent directly to Segment
Events.onEvent(trackEvent)

require("../analytics/main_layout.ts")

$(() =>
  analytics.ready(function () {
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
      analytics.identify(sd.CURRENT_USER.id, traits, {
        integrations: { Marketo: false },
      })
      // clear analytics cache when user logs out
      analyticsHooks.on("auth:logged-out", () => analytics.reset())
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
    require("../analytics/eoy_2016.js")
    require("../analytics/embedded_inquiry.js")
    require("../analytics/inquiry_questionnaire.js")
    require("../analytics/editorial_features.js")
    require("../analytics/gallery_partnerships.js")
  })
)
