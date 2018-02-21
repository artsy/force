(function () {
  'use strict'

  // DOM events
  var $document = $(document)

  var trackHover = _.once(function () {
    analytics.track('Hover over notification bell in header', {
      new_notification_count: $('.js-notification-count').text()
    })
  })

  $document.on('mouseover', '.js-notification-hover', function (e) {
    if ($(e.target).closest('.hover-pulldown-menu').length) {
      return false
    }
    trackHover()
  })

  $document.on('click', '.js-notification-bundle', function (e) {
    var $bundle = $(e.currentTarget)

    analytics.track('Selected notification from dropdown', {
      new_notification: $bundle.data('unread'),
      number_notified_works: $bundle.data('message').replace(/ Works? Added/i, ''),
      artist_slug: $bundle.data('artist')
    })
  })

  $document.on('click', '.js-notification-view-all', function (e) {
    analytics.track('Clicked view all from notification dropdown')
  })

  $document.on('click', '#for-sale', function (e) {
    analytics.track('Toggled "For Sale" on "Works For You" page')
  })

  $document.on('click', '#notifications-manage-follow', function (e) {
    analytics.track('Clicked "Manage who you follow" on "Works For You" page')
  })

  $document.on('click', '.notifications-see-more', function (e) {
    analytics.track('Clicked "See More" in artwork group on "Works For You" page')
  })
})()
