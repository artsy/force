import mediator from "../lib/mediator.coffee"
import _ from "underscore"
import $ from "jquery"
const analyticsHooks = require("desktop/lib/analytics_hooks.coffee")
const analytics = window.analytics

//
// Generic events for tracking events around account creation.
//

const getUrlParameter = name => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  let results = regex.exec(location.search)
  return results === null
    ? undefined
    : decodeURIComponent(results[1].replace(/\+/g, " "))
}

const getAcquisitionInitiative = () =>
  getUrlParameter("m-id") || getUrlParameter("acquisition_initiative")

const trackAccountCreation = options => {
  analytics.track("Created account", options)

  analytics.identify(options.user_id, _.pick(options, "email"), {
    integrations: {
      All: false,
      Marketo: true,
    },
  })
}

// Created account (via email)
$(document).one(
  "submit",
  ".auth-register form, .marketing-signup-modal form, .artist-page-cta-overlay__register form",
  () => {
    $(document).one("ajaxComplete", (e, xhr, options) =>
      mediator.trigger("auth:sign_up:email", {
        acquisition_initiative: getAcquisitionInitiative(),
        signup_service: "email",
        user_id: xhr.responseJSON.user.id,
        context: options.context,
        email: xhr.responseJSON.user.email,
      })
    )
  }
)

// Created account (via social)

// 1. Upon clicking the social signup button
$(document).on("click", ".auth-signup-facebook", e => {
  // 2. Store some data in cookies before being redirected everywhere
  mediator.trigger("auth:sign_up:fb", {
    service: "facebook",
    acquisition_initiative: getAcquisitionInitiative(),
    context: $(e.currentTarget).data("context"),
  })
})

analyticsHooks.on("auth:login", (options = {}) => {
  analytics.track("Successfully logged in", options)
})

// Clicked sign up via the header
$(".mlh-signup").click(function() {
  analytics.track("Clicked sign up via the header")
})

// Clicked sign out via the header
$(".mlh-logout").click(function() {
  analytics.track("Clicked logout via the header")
})

analyticsHooks.on("mediator:open:auth", (options = {}) => {
  analytics.trackLink($(".auth-signup-facebook")[0], "Created account")
  analytics.trackLink($(".auth-signup-twitter")[0], "Created account")
})

// Created account via consignments submission page
analyticsHooks.on("consignment:account:created", function(options) {
  if (options.accountCreated) {
    trackAccountCreation({
      signup_service: "email",
      user_id: options.id,
      context: "consignments",
      email: options.email,
    })
  } else {
    analytics.identify(options.user_id, options.email, {
      integrations: {
        All: false,
        Marketo: true,
      },
    })
  }
})
