import { data as sd } from "sharify"
import {
  ContextModule,
  Intent,
  createdAccount,
  successfullyLoggedIn,
} from "@artsy/cohesion"
import $ from "jquery"
import { omit } from "lodash"
const analyticsHooks = require("desktop/lib/analytics_hooks.coffee")
const analytics = window.analytics
;(function () {
  "use strict"

  let namespace, track, trackWithoutNamespace, bind, bindOnce

  function getTrackingOptions() {
    let trackingOptions = {}

    const referrer = window.analytics.__artsyClientSideRoutingReferrer
    // Grab referrer from our trackingMiddleware in Reaction, since we're in a
    // single-page-app context and the value will need to be refreshed on route
    // change. See: https://github.com/artsy/force/blob/master/src/v2/Artsy/Analytics/trackingMiddleware.ts
    if (referrer) {
      trackingOptions = {
        page: {
          referrer,
        },
      }
    }

    return trackingOptions
  }

  namespace = function (name) {
    return "inquiry_questionnaire:" + name
  }

  track = function (event, props = {}) {
    event = namespace(" " + event)
    analytics.track(event, props, getTrackingOptions())
  }

  trackWithoutNamespace = function (event, props = {}) {
    analytics.track(event, props, getTrackingOptions())
  }

  bind = function (name, handler) {
    analyticsHooks.on(namespace(name), handler)
  }

  bindOnce = function (name, handler) {
    // In the experimental page shell, we might have multiple inquiries
    // _per session_, and therefore can't rely on `once`, as subsequent
    // inquiries would then not get tracked as there's no "hard jumps"
    // between pages. See: https://github.com/artsy/force/pull/5232
    analyticsHooks.on(namespace(name), handler)
  }

  // DOM events
  let $document = $(document)

  $document.on("click", ".js-choice", function () {
    let choice = $(this).data("value")
    track("Clicked on how_can_we_help option", {
      choice: choice,
    })
  })

  $document.on("click", ".js-iq-collector-level", function (e) {
    track('Clicked "Yes" or "No" button on commercial_interest', {
      collector_level: e.currentTarget.value,
    })
  })

  $document.on("click", ".js-login-email", function () {
    track('Clicked "Log in"')
  })

  $document.on("click", ".js-forgot-password", function () {
    track('Clicked "Forgot Password?"')
  })

  $document.on("click", ".js-send-inquiry", function () {
    track('Clicked "Send" on inquiry form')
  })

  $document.one("input", ".js-inquiry-message", function (e) {
    track("User changed inquiry message from default")
  })

  $document.on("alert", ".js-inquiry-message", function (e) {
    track("User nudged to change inquiry message from default")
  })

  $document.on("click", ".js-iq-save-skip", function () {
    track('Clicked on "No thanks don’t save my information"')
  })

  // Proxied events
  bind("modal:opened", function (context) {
    track("Opened inquiry flow")
  })

  bind("modal:closed", function (context) {
    track("Closed inquiry flow")
  })

  bind("state:completed", function (context) {
    track("Completed inquiry flow")
  })

  bind("state:aborted", function (context) {
    track("Aborted inquiry flow", {
      current: context.state.current(),
    })
  })

  bind("state:next", function (context) {
    track("State changed to " + context.state.current())
    track("State change", {
      current: context.state.current(),
    })
  })

  bind("user:change:profession", function (context) {
    track("User set profession", {
      profession: context.user.get("profession"),
    })
  })

  bind("user:change:location", function (context) {
    track("User set location", {
      location: context.user.get("location"),
    })
  })

  bind("user:change:phone", function (context) {
    track("User set phone", {
      phone: context.user.get("phone"),
    })
  })

  bind("user:sync", function (context) {
    track("User data saved")
  })

  bind("collector_profile:sync", function (context) {
    track("CollectorProfile data saved")
  })

  bindOnce("inquiry:sync", function (context) {
    track("Inquiry successfully sent")
  })

  bind("inquiry:error", function (context) {
    track("Problem sending inquiry", context.inquiry.attributes)
  })

  bind("collector_profile:change:affiliated_gallery_ids", function (context) {
    track("Changed collector_profile:affiliated_gallery_ids", {
      ids: context.collectorProfile.get("affiliated_gallery_ids"),
    })
  })

  bind("collector_profile:change:affiliated_auction_house_ids", function (
    context
  ) {
    track("Changed collector_profile:affiliated_auction_house_ids", {
      ids: context.collectorProfile.get("affiliated_auction_house_ids"),
    })
  })

  bind("collector_profile:change:affiliated_fair_ids", function (context) {
    track("Changed collector_profile:affiliated_fair_ids", {
      ids: context.collectorProfile.get("affiliated_fair_ids"),
    })
  })

  bind("collector_profile:change:institutional_affiliations", function (
    context
  ) {
    track("Changed collector_profile:institutional_affiliations", {
      value: context.collectorProfile.get("institutional_affiliations"),
    })
  })

  // Non-namespaced events
  bind("user:login", function (context) {
    const userId = context.user.get("id")
    const analyticsOptions = successfullyLoggedIn({
      authRedirect: location.href,
      contextModule: ContextModule.artworkSidebar,
      intent: Intent.inquire,
      service: "email",
      userId,
    })
    trackWithoutNamespace(
      analyticsOptions.action,
      omit(analyticsOptions, "action")
    )
  })

  bind("user:signup", function (context) {
    const userId = context.user.get("id")
    const analyticsOptions = createdAccount({
      authRedirect: location.href,
      contextModule: ContextModule.artworkSidebar,
      intent: Intent.inquire,
      service: "email",
      userId,
    })
    trackWithoutNamespace(
      analyticsOptions.action,
      omit(analyticsOptions, "action")
    )
  })

  bindOnce("inquiry:sync", function (context) {
    trackWithoutNamespace("Sent artwork inquiry", {
      artwork_id: context.artwork.get("_id"),
      products: [
        {
          product_id: context.artwork.get("_id"),
          quantity: 1,
          price: context.artwork.get("price") || 6000,
        },
      ],
      artwork_slug: context.artwork.id,
      inquiry_id: context.inquiry.id,
    })
  })

  bindOnce("inquiry:show", function (context) {
    trackWithoutNamespace("Sent show inquiry", {
      label: context.label,
    })
  })

  bindOnce("contact:hover", function (context) {
    trackWithoutNamespace("Hovered over contact form 'Send' button")
  })

  bindOnce("contact:close-x", function (context) {
    trackWithoutNamespace("Closed the inquiry form via the '×' button")
  })

  bindOnce("contact:close-back", function (context) {
    trackWithoutNamespace(
      "Closed the inquiry form by clicking the modal window backdrop"
    )
  })

  bindOnce("contact:submitted", function (context) {
    trackWithoutNamespace("Contact form submitted", context.attributes)
  })

  bind("inquiry:sent", function (context) {
    track("Sent artwork inquiry", { label: context.label })
    track("Submit confirm inquiry modal", context.attributes)
    track(context.changed + " default message")
    track("Inquiry: " + context.version + " Flow", context.session_id)
  })
})()
