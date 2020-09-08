;(function () {
  "use strict"
  if (
    location.pathname.match(new RegExp("/favorites")) ||
    location.pathname.match(new RegExp("/following/.*"))
  ) {
    analytics.page("Favorites/Follows page", {
      integrations: { Marketo: false },
    })
  }

  analyticsHooks.on("follow:sign-up", function (options) {
    analytics.track("Triggered sign up form via follow button")
  })
})()
