import {
  ContextModule,
  Intent,
  ActionType,
  AuthModalType,
} from "@artsy/cohesion"
import { omit } from "lodash"
import { analyticsHooks } from "desktop/components/inquiry_questionnaire/analytics/analyticsHooks"
import { setAnalyticsClientReferrerOptions } from "lib/analytics/setAnalyticsClientReferrerOptions"
;(function () {
  "use strict"

  let namespace, track, trackWithoutNamespace, bind, bindOnce

  namespace = function (name) {
    return "inquiry_questionnaire:" + name
  }

  track = function (event, props = {}) {
    event = namespace(" " + event)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.track(event, props, setAnalyticsClientReferrerOptions())
  }

  trackWithoutNamespace = function (event, props = {}) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.track(event, props, setAnalyticsClientReferrerOptions())
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

  // Proxied events
  bind("modal:opened", function (_context) {
    track("Opened inquiry flow")
  })

  bind("modal:closed", function (_context) {
    track("Closed inquiry flow")
  })

  bind("state:completed", function (_context) {
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

  bind("user:sync", function (_context) {
    track("User data saved")
  })

  bind("collector_profile:sync", function (_context) {
    track("CollectorProfile data saved")
  })

  bindOnce("inquiry:sync", function (_context) {
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
    const analyticsOptions = {
      action: ActionType.successfullyLoggedIn,
      type: AuthModalType.login,
      user_id: userId,
      auth_redirect: location.href,
      context_module: ContextModule.artworkSidebar,
      intent: Intent.inquire,
      service: "email",
      trigger: "click",
    }
    trackWithoutNamespace(
      analyticsOptions.action,
      omit(analyticsOptions, "action")
    )
  })

  bind("user:signup", function (context) {
    const userId = context.user.get("id")
    const analyticsOptions = {
      action: ActionType.createdAccount,
      type: AuthModalType.signup,
      user_id: userId,
      onboarding: false,
      auth_redirect: location.href,
      context_module: ContextModule.artworkSidebar,
      intent: Intent.inquire,
      service: "email",
      trigger: "click",
    }
    trackWithoutNamespace(
      analyticsOptions.action,
      omit(analyticsOptions, "action")
    )
  })

  bindOnce("inquiry:sync", function (context) {
    trackWithoutNamespace("Sent artwork inquiry", {
      artwork_id: context.artwork.get("_id"),
      artwork_slug: context.artwork.id,
      inquiry_id: context.inquiry.id,
      products: [
        {
          price: context.artwork.get("price") || 6000,
          product_id: context.artwork.get("_id"),
          quantity: 1,
        },
      ],
    })
  })

  bindOnce("inquiry:show", function (context) {
    trackWithoutNamespace("Sent show inquiry", {
      label: context.label,
    })
  })

  bindOnce("contact:hover", function (_context) {
    trackWithoutNamespace("Hovered over contact form 'Send' button")
  })

  bindOnce("contact:close-x", function (_context) {
    trackWithoutNamespace("Closed the inquiry form via the '×' button")
  })

  bindOnce("contact:close-back", function (_context) {
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
