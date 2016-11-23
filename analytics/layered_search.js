(function () {
  'use strict'

  analyticsHooks.on('switched:layer', function (options) {
    analytics.track('Switched to related artworks: ' + options.label)
  })
})()
