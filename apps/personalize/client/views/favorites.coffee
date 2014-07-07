_ = require 'underscore'
Backbone = require 'backbone'
StepView = require './step.coffee'
Artworks = require '../../../../collections/artworks.coffee'
Artists = require '../../../../collections/artists.coffee'
Genes = require '../mixins/genes.coffee'
ArtworkColumnsView = require '../../../../components/artwork_columns/view.coffee'
{ setSkipLabel } = require '../mixins/followable.coffee'
{ API_URL } = require('sharify').data

template = -> require('../../templates/favorites.jade') arguments...

module.exports = class FavoritesView extends StepView
  _.extend @prototype, Genes

  setSkipLabel: setSkipLabel

  events:
    'click .personalize-skip': 'advance'

  initialize: (options) ->
    super
    @artworks = new Artworks
    @initializeGenes size: 5, success: (collection, response, options) =>
      if response.length
        @fetchArtworks()
      else # No genes were followed
        @fetchFallbackArtworks()

  fetchFallbackArtworks: ->
    artists = new Artists
    artists.url = "#{API_URL}/api/v1/artists/sample"
    artists.fetch data: { size: 10 }, success: =>
      $.when.apply(null, artists.map (artist) =>
        artist.artworks.fetch
          data: size: 2
          success: (collection, response, options) =>
            @artworks.add response
      ).then =>
        @setupFavorites()
        @renderArtworks()

  fetchArtworks: ->
    $.when.apply(null, @genes.map (gene) =>
      gene.fetchArtworks
        data: size: 10
        success: (collection, response, options) =>
          @artworks.add response
    ).then =>
      @setupFavorites()
      @renderArtworks()

  setupFavorites: ->
    @user.initializeDefaultArtworkCollection()
    @user.artistsFromFavorites = new Artists
    @favorites = @user.defaultArtworkCollection()
    @favoriteArtworks = @favorites.get 'artworks'

    @listenTo @favoriteArtworks, 'add remove', @setSkipLabel, this
    @listenTo @favoriteArtworks, 'add', (favorite) =>
      @user.artistsFromFavorites.add @artworks.get(favorite.id).get('artist')
    @listenTo @favorites, 'artworksFetched', => # Called more than once
      @user.artistsFromFavorites.add @favoriteArtworks.map (favorite) =>
        @artworks.get(favorite.id).get 'artist'

  renderArtworks: ->
    @artworks.reset @artworks.shuffle(), silent: true
    @artworkColumnsView = new ArtworkColumnsView
      el: @$('#personalize-favorites-container')
      collection: @artworks
      allowDuplicates: true
      numberOfColumns: 4
      gutterWidth: 40
      maxArtworkHeight: 400
      isOrdered: false
      seeMore: false
      artworkSize: 'tall'
      currentUser: @user
    @disableArtworkLinks()
    @fadeInHearts()

  # Disable links to the artworks
  disableArtworkLinks: ->
    @$('.artwork-item-image-link')
      .attr('href', null)
      .css('cursor', 'default')

  # Fades in a column of hearts at a time
  fadeInHearts: ->
    $buttonColumns = _.map @artworkColumnsView.$columns, (column) ->
      $(column).find('.overlay-container > *').css 'opacity', 0
    _.delay =>
      _.each $buttonColumns, (buttonColumn, i) ->
        _.delay (=> $(buttonColumn).css 'opacity', 1), (i + 1) * 50
    , 1000

  render: ->
    @$el.html template(state: @state)
    this

  remove: ->
    @artworkColumnsView?.remove()
    super
