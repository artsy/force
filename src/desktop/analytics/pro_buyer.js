(function () {
  'use strict'

  if (location.pathname.match('/professional-buyer')) {
    $('.analytics-pro-buyer-join').click(function (e) {
      analytics.track('Clicked professional buyer join')
    })

    $('.analytics-pro-buyer-logout').click(function () {
      analytics.track('Clicked professional buyer join as different user')
    })

    $('.analytics-pro-buyer-complete-submit').click(function () {
      analytics.track('Professional buyer application submitted')
    })

    analyticsHooks.on('pro_buyer:complete:error', function (context) {
      analytics.track('Professional buyer application failed to submit', context)
    })
  }

  if (location.search.match('source=professional-buyer')) {
    $('.analytics-confirmation-confirm').click(function () {
      analytics.track('Clicked professional buyer personalize')
    })
  }
})()
