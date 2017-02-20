(function () {
  'use strict'

  var alreadyTracked = false

  var isRVARailVisible = function () {
    if($('#recently-viewed-artworks').length < 1){ return false; }
    var viewportTop = $(window).scrollTop()
    var viewportBottom = viewportTop + $(window).height()
    var rvaTop = $('#recently-viewed-artworks').offset().top
    var rvaHeight = $('#recently-viewed-artworks').height()
    return viewportBottom > (rvaTop + rvaHeight)
  }

  var RVAArtworkIds = function () {
    return $('#recently-viewed-artworks .artwork-item').map(function () {
      return $(this).attr('data-artwork-id')
    }).toArray()
  }

  var trackImpressions = function () {
    if (!alreadyTracked && isRVARailVisible()) {
      var ids = RVAArtworkIds()
      if (ids.length > 0) {
        analytics.track('Impression', {
          type: 'module',
          label: 'Recently viewed artworks',
          artwork_ids: ids
        })
        alreadyTracked = true
      }
    }
  }

  $(window).on('scroll', _.throttle(trackImpressions, 200))

  $(document).on('click', '.analytics-rva-artwork-thumbnail', function (e) {
    analytics.track('Click', {
      type: 'thumbnail',
      label: 'Recently viewed artwork',
      context_module: 'recently_viewed_artworks',
      destination_path: $(this).attr('href')
    })
  })
})()
