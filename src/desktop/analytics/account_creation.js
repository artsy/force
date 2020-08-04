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

analyticsHooks.on("auth:login", (options = {}) => {
  analytics.track("Successfully logged in", options)
})
