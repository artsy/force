var trackedIds = []
var artworkSlugRegex = /artwork\/(.[a-zA-Z0-9-]*)/

var visibleArtworkIds = function () {
  // Find any link to an artwork that contains an image...
  // that's pretty much an "artwork impression" right?
  var ids = $('[href*="/artwork/"] img').filter(function () {
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
    return $(this).closest('a').attr('href').match(artworkSlugRegex)[1]
  }).toArray()

  // Add the artwork page as an impression
  if (location.pathname.match(artworkSlugRegex)) {
    ids.push(location.pathname.match(artworkSlugRegex)[1])
  }

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
    }, {
        integrations: { 'Mixpanel': false }
      })
  }
}

trackImpressions()
$(window).on('scroll', _.debounce(trackImpressions, 200))
