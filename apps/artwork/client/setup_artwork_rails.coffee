_ = require 'underscore'
ArtworkRailView = require '../../../components/artwork_rail/client/artwork_rail_view.coffee'
Artworks = require '../../../collections/artworks.coffee'

railwayMap = (artwork) ->
  similar_artworks:
    url: "/"
    title: "Similar Artworks from #{artwork.artist?.name}"
  partner_artworks:
    url: "/"
    title: "More Works From #{artwork.partner?.name}"
  artist_artworks:
    url: "/"
    title: "More Works From #{artwork.artist?.name}"
  show_artworks:
    url: "/"
    title: "More Works From #{artwork.shows[0]?.name}"
  fair_artworks:
    url: "/"
    title: "More Works From #{artwork.related?.name}"
  current_auction_artworks:
    url: "/"
    title: "More Works From #{artwork.related?.name}"
  closed_auction_artworks:
    url: "/"
    title: "More Works From #{artwork.related?.name}"

module.exports = ->
  $.ajax
    url: "#{sd.APP_URL}/artwork/#{sd.ARTWORK.id}/artwork_rails"
    success: (response) ->
      options = railwayMap(response.artwork)

      _.each response.rails, (value, key) ->
        artworks = new Artworks value
        view = new ArtworkRailView
          collection: artworks
          title: options[key].title
          viewAllUrl: options[key].url

        $('#artwork-rails').append view.render().$el
