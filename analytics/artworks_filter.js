(function () {
  'use strict'

  // DOM events
  var $document = $(document)

  $document.on('click', '.filter-nav-only-for-sale', function (e) {
    analytics.track('Clicked Only for Sale button on artworks filter')
  })

  $document.on('click', '.artwork-filter-select', function (e) {
    analytics.track('Selected an artist artwork filter')
  })

  $document.on('click', '.artwork-filter-remove', function (e) {
    analytics.track('Manually cleared an artist artwork filter')
  })

  $document.on('click', '#for-sale', function (e) {
    analytics.track('Toggled "Only For Sale" artist artwork filter')
  })

  $document.on('click', '#artwork-see-more', function (e) {
    analytics.track('Clicked "See More" for artist artwork filter results')
  })

  $document.on('click', '.artwork-filter-view-mode__toggle', function (e) {
    var $target = $(e.currentTarget)
    analytics.track('Toggled artwork view mode to ' + $target.data('mode'))
  })

  analyticsHooks.on('artwork_viewmode:toggled', function (data) {
    analytics.track('Artwork view mode switched', { mode: data.mode })
  })

  analyticsHooks.on('artwork_filter:activated', function (data) {
    analytics.track('Activated artworks filter', {
      filter: data.attr,
      value: data.val
    })
  })

  analyticsHooks.on('artwork_filter:new_page', function (data) {
    analytics.track('Artworks filter / Scrolled to new page', {
      page: data.page
    })
  })
})()
