_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
artistHeaderTemplate = -> require('../templates/artist_header.jade') arguments...

module.exports = class ArtistWorksView extends Backbone.View

  events:
    'click .artist-clear' : 'clearArtistWorks'

  initialize: ({@filterState}) ->
    @$artistHeader = @$('.notifications-artist-sub-header')
    @$artistFeed = @$('#notifications-artist-feed')

    @filterState.on 'change', @fetchAndRender

  fetchAndRender: =>
    return unless @filterState.get('artist')
    return unless @filterState.get('loading')

    @artist = new Artist id: @filterState.get 'artist'
    @forSaleArtist = if @filterState.get('forSale') then 'for_sale' else ''
    @artist.related().artworks.fetchUntilEnd
      data:
        filter: [@forSaleArtist]
      success: =>
        if @artist.related().artworks.length
          @renderColumns @$artistFeed, @artist.related().artworks
          @$artistHeader.html artistHeaderTemplate
            name: $(".filter-artist[data-artist=#{@filterState.get('artist')}]").children('.filter-artist-name').html()
            count: @artist.related().artworks.length
            id: @artist.id
          @$artistHeader.show()
        else
          @filterState.set 'empty', true
        @filterState.set 'loading', false

  renderColumns: ($el, artworks) ->
    new ArtworkColumnsView
      el: $el
      collection: artworks
      artworkSize: 'large'
      numberOfColumns: 3
      gutterWidth: 40
      allowDuplicates: true
      maxArtworkHeight: 600

  clearArtistWorks: =>
    $('.filter-artist[data-state=selected] .filter-artist-clear').click()





