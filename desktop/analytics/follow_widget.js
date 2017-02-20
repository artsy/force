(function () {
  'use strict'
  analyticsHooks.on('follow-widget:follow', function (options) {
    analytics.track('Followed Artist', {
      entity_slug: options.entity_slug,
      entity_id: options.entity_id,
      context_page: options.context_page,
      context_module: 'follow-widget'
    })
  })

  analyticsHooks.on('follow-widget:opened', function (options) {
    analytics.track('Show follow widget')
  })

  analyticsHooks.on('follow-widget:closed', function (options) {
    analytics.track('Dismiss follow widget')
  })

  analyticsHooks.on('follow-widget:clicked-artist-name', function (options) {
    analytics.track('Clicked artist name on follow widget')
  })
})()
