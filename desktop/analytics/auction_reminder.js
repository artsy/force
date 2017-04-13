(function () {
  'use strict'

  // DOM events
  var $document = $(document)

  analyticsHooks.on('auction_reminder:click', function (data) {
    analytics.track('Clicked Auction Reminder', {
      slug: data.slug,
      auction_state: data.auction_state
    })
  })

  analyticsHooks.on('auction_reminder:close', function (data) {
    analytics.track('Closed Auction Reminder', {
      slug: data.slug,
      auction_state: data.auction_state
    })
  })
})()
