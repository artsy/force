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
    track('Sent show inquiry', {
      // inquiry_id: gravity id of the inquiry,
      // show_id: gravity id of the partner show,
      // show_slug: slug of the partner show,
      // fair_id: id of the fair the show is in
    })
  })

})()
