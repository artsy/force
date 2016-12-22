(function () {
  'use strict'

  // DOM events
  var $document = $(document)
  $document.on('click', '.analytics-artwork-purchase-back-to-browsing', function () {
    analytics.track("Clicked 'Back to Browsing' purchase flow")
  })

  analyticsHooks.on('purchase:signup:success', function (context) {
    analytics.track("Created account", {
      context: 'purchase flow',
      user_id: context.user.id
    })
  })

  analyticsHooks.on('purchase:inquiry:success', function (context) {
    analytics.track('Sent artwork inquiry', {
      artwork_id: context.artwork._id,
      artwork_slug: context.artwork.id,
      inquiry_id: context.inquiry.id,
      user_id: context.user.id
    })
  })
  analyticsHooks.on('purchase:inquiry:failure', function (context) {
    var data = {
      artwork_id: context.artwork._id,
      artwork_slug: context.artwork.id,
      message: context.message
    }
    if (context.user && context.user.id) {
      data.user_id = context.user.id;
    }
    analytics.track('Purchase request failed to submit', data)
  })
})()
