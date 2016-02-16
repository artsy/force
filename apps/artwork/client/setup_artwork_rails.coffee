_ = require 'underscore'
Q = require 'bluebird-q'
{ slugify } = require 'underscore.string'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
ArtworkRailView = require '../../../components/artwork_rail/client/artwork_rail_view.coffee'
LayeredSearchView = require('./layered_search.coffee').LayeredSearchView

railwayMap = (artwork) ->
  for_sale_artworks:
    url: "/artist/#{artwork.artist?.id}?for_sale=true"
    title: "For Sale Artworks by #{artwork.artist?.name}"
  similar_artworks:
    url: "/artist/#{artwork.artist?.id}?medium=#{slugify(artwork.category)}"
    title: "Similar Artworks by #{artwork.artist?.name}"
  partner_artworks:
    url: "/#{artwork.partner?.default_profile_id}/works"
    title: "Other Works from #{artwork.partner?.name}"
  artist_artworks:
    url: "/artist/#{artwork.artist.id}/works"
    title: "Other Works by #{artwork.artist?.name}"
  show_artworks:
    url: "/show/#{artwork.shows[0]?.id}"
    title: "Other Works from #{artwork.shows[0]?.name}"

module.exports = (model, artist) ->
  $.ajax
    url: "#{sd.APP_URL}/artwork/#{model.id}/artwork_rails"
    success: ({artwork, rails, in_auction}) ->
      if not in_auction
        new LayeredSearchView
          el: $('#artwork-below-the-fold-section')
          artwork: model

        $('#artwork-below-the-fold-section').attr 'data-state', 'fade-in'

      # if rails endpoint doesn't return anything, fall back to old related works
      if _.isEmpty rails
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
      else
        options = railwayMap artwork

        # if the artwork in question is sold or not for sale,
        # pop the first rail above the artwork related information
        # and continue the rest below
        if rails['for_sale_artworks']
          artworks = new Artworks rails['for_sale_artworks']
          view = new ArtworkRailView
            collection: artworks
            title: options['for_sale_artworks'].title
            viewAllUrl: options['for_sale_artworks'].url
            railId: 'for_sale_artworks'

          $('#artwork-for-sale-rail').append view.render().$el

          Q.resolve(view.carouselPromise).then ->
            # its better to wait a little bit here to let the carousel render
            $('#artwork-for-sale-rail').attr 'data-state', 'fade-in'

          rails = _.omit(rails, 'for_sale_artworks')

        # wait for all carousels to initialize before fading in
        carouselPromises = _.map rails, (value, key) ->
          artworks = new Artworks value
          view = new ArtworkRailView
            collection: artworks
            title: options[key].title
            viewAllUrl: options[key].url
            railId: key

          $('#artwork-rails').append view.render().$el

          view.carouselPromise

        Q.all(carouselPromises).then ->
          $('#artwork-rails').attr 'data-state', 'fade-in'


