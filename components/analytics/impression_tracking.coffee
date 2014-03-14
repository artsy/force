_         = require 'underscore'
sd        = require('sharify').data
analytics = require('../../lib/analytics.coffee')

# very basic impression tracking that tracks all visible artworks when the $list is scrolled to
# - only tracks VISIBLE artworks (useful for things like fillwidth rows where we don't display all artworks in the api response)
# - will track an artwork multiple times if it is seen multiple times
# - does not track artworks displayed after clicking 'see more'
module.exports.trackArtworkImpressions = (artworks, $container) ->
  return unless $container?.length
  $window = $(window)
  top = $container.offset().top
  eventId = artworks[0].get('id')
  $window.off(".#{eventId}")
  $window.on "scroll.#{eventId}", _.throttle(->
    if ($window.scrollTop() + ($window.height() or 0)) >= top
      $window.off(".#{eventId}")
      viewedArtworkIds = _.compact(_.map(artworks, (artwork) -> artwork.get('id') ))
      analytics.trackImpression 'Artwork', viewedArtworkIds
  , 500)
