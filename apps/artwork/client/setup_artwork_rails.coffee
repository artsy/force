_ = require 'underscore'
{ slugify } = require 'underscore.string'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
ArtworkRailView = require '../../../components/artwork_rail/client/artwork_rail_view.coffee'
LayeredSearchView = require('./layered_search.coffee').LayeredSearchView

railwayMap = (artwork) ->
  similar_artworks:
    url: "/artist/#{artwork.artist?.id}?medium=#{slugify(artwork.category)}"
    title: "Similar Artworks from #{artwork.artist?.name}"
  partner_artworks:
    url: "/#{artwork.partner?.default_profile_id}/works"
    title: "More Works From #{artwork.partner?.name}"
  artist_artworks:
    url: "/artist/#{artwork.artist.id}/works"
    title: "More Works From #{artwork.artist?.name}"
  show_artworks:
    url: "/show/#{artwork.shows[0]?.id}"
    title: "More Works From #{artwork.shows[0]?.name}"
  current_auction_artworks:
    url: "/auction/#{artwork.related?.id}"
    title: "More Works From #{artwork.related?.name}"
  closed_auction_artworks:
    url: "/auction/#{artwork.related?.id}"
    title: "More Works From #{artwork.related?.name}"

module.exports = (artwork, artist) ->
  new LayeredSearchView
    el: $('#artwork-below-the-fold-section')
    artwork: artwork

  $('#artwork-below-the-fold-section').attr 'data-state', 'fade-in'

  $.ajax
    url: "#{sd.APP_URL}/artwork/#{artwork.id}/artwork_rails"
    success: ({artwork, rails}) ->
      options = railwayMap artwork

      unless _.isEmpty rails
        _.each rails, (value, key) ->
          artworks = new Artworks value
          view = new ArtworkRailView
            collection: artworks
            title: options[key].title
            viewAllUrl: options[key].url

          $('#artwork-rails').append view.render().$el

        $('#artwork-rails').attr 'data-state', 'fade-in'
      else
        return unless artist.related().artworks.length
        $('#artist-artworks-section').addClass('is-fade-in').show()

        new ArtworkColumnsView
          el: $('#artist-artworks-section .artworks-list')
          collection: artist.related().artworks
          allowDuplicates: true
          numberOfColumns: 4
          gutterWidth: 40
          maxArtworkHeight: 400
          isOrdered: false
          seeMore: false
          artworkSize: 'tall'

