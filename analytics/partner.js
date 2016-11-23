(function () {
  'use strict'

  analyticsHooks.on('show_number:displayed', function () {
    analytics.track("Displayed 'show phone number' button", {nonInteraction: 1})
  })

  analyticsHooks.on('partner:non-claimed', function (options) {
    analytics.track('Non-claimed partner page', _.extend(options, {nonInteraction: 1}))
  })
})()
