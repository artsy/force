//
// Analytics that occur globaly on every page. Think if there's a better place
// before you add to this file.
//

analyticsHooks.on("track", function (message, options) {
  analytics.track(message, options)
})

// Track 15 second bounce rate
setTimeout(function () {
  analytics.track("time on page more than 15 seconds", {
    category: "15 Seconds",
    message: sd.CURRENT_PATH,
  })
}, 15000)

// Debug tracking calls
if (sd.SHOW_ANALYTICS_CALLS) {
  analytics.on("track", function () {
    console.debug("TRACKED: ", arguments[0], JSON.stringify(arguments[1]))
  })
}
if (sd.SHOW_ANALYTICS_CALLS) {
  analyticsHooks.on("all", function (name, data) {
    console.info("ANALYTICS HOOK: ", name, data)
  })
}
