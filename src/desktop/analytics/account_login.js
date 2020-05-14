const analyticsHooks = require("desktop/lib/analytics_hooks.coffee")
const analytics = window.analytics

//
// Generic events around attempting to log in
//

// Login: The password you entered is incorrect.
analyticsHooks.on("mediator:auth:error", function(message) {
  if (message === "invalid email or password") {
    analytics.track("Login: The password you entered is incorrect.")
  }
})
