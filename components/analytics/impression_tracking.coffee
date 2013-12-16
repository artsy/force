_           = require 'underscore'
sd          = require('sharify').data

# very basic impression tracking that tracks all visible artworks when the $list is scrolled to
# - only tracks VISIBLE artworks (useful for things like fillwidth rows where we don't display all artworks in the api response)
# - will track an artwork multiple times if it is seen multiple times
# - does not track artworks displayed after clicking 'see more' on shows
module.exports = class ImpressionTracking

  initialize: (listItems, $list) ->
    @$window = $('window')

  trackListItems: (listItems, $list) ->
    return unless listItems?.length
    top = $list.offset().top
    eventId = listItems[0].model.get('id')
    @$window.on "scroll.#{eventId}", _.throttle(->
      if (@$window.scrollTop() + @$window.height()) > top
        @$window.off(".#{eventId}")
        viewedArtworkIds = _.compact(_.map(listItems, (artworkView) -> artworkView.model.get('id') ))
        window.viewedArtworkIds = window.viewedArtworkIds.concat viewedArtworkIds
    , 500)
