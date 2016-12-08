(function () {
  'use strict'

  // Hooks
  analyticsHooks.on('show_feed:contact', function(context) {
    analytics.track('Clicked "Contact Gallery"', {
      show_id: context.show.get('_id'),
      context_type: "fair exhibitors browse"
    })
  })

  analyticsHooks.on('show_feed:inquiry:sent', function (context) {
    analytics.track('Sent show inquiry', {
      inquiry_id: context.inquiry.id,
      show_id: context.show.get('_id'),
      show_slug: context.show.id,
      fair_id: context.fair_id
    })
  })

})()
