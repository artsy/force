_ = require 'underscore'
Backbone = require 'backbone'
StepView = require './step.coffee'
Artworks = require '../../../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../../../components/artwork_columns/view.coffee'
{ API_URL } = require('sharify').data
template = -> require('../../templates/favorites.jade') arguments...

module.exports = class FavoritesView extends StepView
  suggestedArtworksSetId: '53c554ec72616961ab9a2000'

  events:
    'click .artwork-item-caption a': 'saveArtwork'

  initialize: (options) ->
    super
    @fetchArtworks()

  fetchArtworks: ->
    @artworks = new Artworks
    @artworks.fetch
      data: size: 40
      url: "#{API_URL}/api/v1/set/#{@suggestedArtworksSetId}/items"
      success: (collection, response, options) =>
        @artworks.reset collection.shuffle()
        @setupFavorites()
        @renderArtworks()

  setupFavorites: ->
    @user.initializeDefaultArtworkCollection()
    @favorites = @user.defaultArtworkCollection()
    @favoriteArtworks = @favorites.get 'artworks'
    @listenTo @favoriteArtworks, 'add remove', @onFavorited, this

  onFavorited: =>
    artworks = @artworks.filter (artwork) =>
      artwork.id in @favoriteArtworks.pluck('id')
    @user.trigger 'personalize:favorite', artworks

  renderArtworks: ->
    @artworks.reset @artworks.shuffle(), silent: true
    @artworkColumnsView = new ArtworkColumnsView
      el: @$('#artsy-primer-personalize-favorites-container')
      collection: @artworks
      allowDuplicates: true
      numberOfColumns: 4
      gutterWidth: 40
      maxArtworkHeight: 400
      isOrdered: false
      seeMore: false
      artworkSize: 'tall'
      currentUser: @user
      displayPrice: false
      context_page: 'Personalize'
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
      @onFavorited()
    , 1000

  saveArtwork: (e) ->
    e.preventDefault()
    # Should attach to parent container and just delegate to save
    # do that if/when save controls A/B test ends

  render: ->
    @$el.html template(state: @state)
    this

  remove: ->
    @artworkColumnsView?.remove()
    super
