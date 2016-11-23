(function () {
  'use strict'

  analyticsHooks.on('order:submitted', function (data) {
    analytics.track('Order submitted', data)
  })

  analyticsHooks.on('order:item-added', function (data) {
    analytics.track('Order - item added', data)
  })

  analyticsHooks.on('order:validated', function (data) {
    analytics.track('Order card validated', data)
  })

  analyticsHooks.on('order:submit-shipping', function (data) {
    analytics.track('Order submit shipping', data)
  })
})()
