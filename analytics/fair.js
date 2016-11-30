(function () {
  'use strict'

  var $document = $(document)

  $document.on('focus', '.fair-layout-search-input', function () {
    analytics.track('Focused on search input at fair')
  })

  analyticsHooks.on('fair:display-following', function () {
    analytics.track('Display following exhibitors at the fair')
  })

  analyticsHooks.on('fair:search:enter', function () {
    analytics.track('Hit enter on fair search')
  })

  analyticsHooks.on('fair:search:focus', function () {
    analytics.track('Focused on search input at fair')
  })

  analyticsHooks.on('fair:search:select', function (data) {
    analytics.track('Selected item from fair search', data)
  })

  analyticsHooks.on('fair:display-following-artists', function () {
    analytics.track('Display following artists at the fair')
  })
})()
