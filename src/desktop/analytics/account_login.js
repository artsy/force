//
// Generic events around attempting to log in
//

const trackLogin = options => {
  analytics.track("Successfully logged in", options)

  analytics.identify(options.user_id, _.pick(options, "email"), {
    integrations: {
      All: false,
      Marketo: true,
    },
  })
}

// Login: The password you entered is incorrect.
analyticsHooks.on("mediator:auth:error", function(message) {
  if (message === "invalid email or password") {
    analytics.track("Login: The password you entered is incorrect.")
  }
})

// Track social auth login
if (Cookies.get("analytics-login")) {
  var data = JSON.parse(Cookies.get("analytics-login"))
  Cookies.expire("analytics-login")

  if (sd.CURRENT_USER) {
    trackLogin({
      ...data,
      user_id: sd.CURRENT_USER.id,
    })
  }
}
