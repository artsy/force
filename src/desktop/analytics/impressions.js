var trackedIds = []

var visibleArtworkIds = function () {
  // Find all of the "artwork item" components that are visible
  // Extra verbose for clarity's sake
  var ids = $('.artwork-item').filter(function () {
    var viewportTop = $(window).scrollTop()
    var viewportBottom = viewportTop + $(window).height()
    var artworkTop = $(this).offset().top
    var artworkBottom = artworkTop + $(this).outerHeight()

    // Either artwork top or artwork bottom is below the top
    // of the browser and above the fold.
    var topInView = artworkTop > viewportTop && artworkTop < viewportBottom
    var bottomInView = artworkBottom > viewportTop && artworkBottom < viewportBottom

    return topInView || bottomInView
  }).map(function () {
    return $(this).attr('data-id')
  }).toArray()

  // Add the artwork page as an impression
  if ($('#artwork-page').length && sd.ARTWORK) ids.push(sd.ARTWORK._id)

  // Don't double track the same impressions
  ids = _.difference(ids, trackedIds)
  trackedIds = trackedIds.concat(ids)

  // Return only the new impressions
  return ids.join()
}

var trackImpressions = function () {
  var ids = visibleArtworkIds()
  if (ids.length > 0) {
    analytics.track('Artwork impressions', {
      ids: ids, nonInteraction: 1
    })
  }
}

trackImpressions()
$(window).on('scroll', _.throttle(trackImpressions, 200))
