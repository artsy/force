;(function() {
  'use strict'

  $(document).on('click', '#keyword-search-bar-input', function(e) {
    analytics.track('Click', {
      type: 'keyword search',
    })
  })

  analyticsHooks.on('cf:followed_artists:checked', function(data) {
    analytics.track('Click', {
      type: 'checkbox',
      label: 'Artists you follow',
      context_module: 'collect_sidebar',
    })
  })

  analyticsHooks.on('search:collect', function(data) {
    analytics.track('Keyword search', { query: data.query })
  })
})()
