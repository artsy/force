;(function() {
  'use strict'

  analyticsHooks.on('followable:followed', function(options) {
    analytics.track('Followed ' + options.entity_type, {
      entity_id: options.entity_id,
      entity_slug: options.entity_slug,
      context_module: options.context_module,
      context_page: options.context_page,
    })
  })

  analyticsHooks.on('followable:unfollowed', function(options) {
    analytics.track('Unfollowed ' + options.entity_type, {
      entity_id: options.entity_id,
      entity_slug: options.entity_slug,
      context_module: options.context_module,
      context_page: options.context_page,
    })
  })

  analyticsHooks.on('follow:login', function(options) {
    analytics.track('Triggered login form via follow button')
  })
})()
