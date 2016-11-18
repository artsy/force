(function () {
  'use strict'

  analyticsHooks.on('cf:followed_artists:checked', function (data) {
    analytics.track('Click', {
      type: 'checkbox',
      label: 'Artists you follow',
      context_module: 'collect_sidebar'
    })
  })
})()
