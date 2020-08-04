import _ from "underscore"
const analyticsHooks = require("desktop/lib/analytics_hooks.coffee")
const analytics = window.analytics

//
// Generic events for tracking events around account creation.
//

analyticsHooks.on("auth:login", (options = {}) => {
  analytics.track("Successfully logged in", options)
})
