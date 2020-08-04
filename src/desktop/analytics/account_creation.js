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

analyticsHooks.on("mediator:open:auth", (options = {}) => {
  analytics.trackLink($(".auth-signup-facebook")[0], "Created account")
  analytics.trackLink($(".auth-signup-twitter")[0], "Created account")
})
