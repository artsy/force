(function () {
  'use strict'

  analyticsHooks.on('feed:paginating', function () {
    analytics.track('Paginating FeedItems')
  })

  analyticsHooks.on('feed:scroll', function (data) {
    analytics.track(data.name + ' scroll: ' + data.scrollPosition)
  })
})()
