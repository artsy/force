//
// Events for signup and login.
//

// Created account (via email)
analyticsHooks.on("auth:signup", function(data, res) {
  analytics.track("Created account", {
    acquisition_initiative: data.acquisition_initiative,
    signup_service: "email",
    user_id: res.user.id,
  })
})

// Created account (via social)

// 1. Upon clicking the social signup button
$(document).on(
  "click",
  ".auth-signup-facebook, .marketing-signup-modal-fb",
  function() {
    // 2. Store some data in cookies before being redirected everywhere
    Cookies.set(
      "analytics-signup",
      JSON.stringify({
        service: "facebook",
        acquisition_initiative: location.search.replace("?m-id=", ""),
      })
    )
  }
)

// Successfully logged in
analyticsHooks.on("auth:login", function(options) {
  analytics.track("Successfully logged in")
})
