(function () {
  'use strict'

  analyticsHooks.on('save:sign-up', function (data) {
    analytics.track('Triggered sign up form via save button')
  })

  analyticsHooks.on('save:save-artwork', function (data) {
    analytics.track('Saved Artwork', {
      entity_slug: data.entity_slug,
      entity_id: data.entity_id,
      context_page: data.context_page,
      context_module: data.context_module
    })
  })

  analyticsHooks.on('save:remove-artwork', function (data) {
    analytics.track('Removed Artwork', {
      entity_slug: data.entity_slug,
      entity_id: data.entity_id,
      context_page: data.context_page,
      context_module: data.context_module
    })
  })
})()
