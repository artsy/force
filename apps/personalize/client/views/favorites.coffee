_ = require 'underscore'
Backbone = require 'backbone'
StepView = require './step.coffee'
Artworks = require '../../../../collections/artworks.coffee'
Artists = require '../../../../collections/artists.coffee'
Genes = require '../mixins/genes.coffee'
ArtworkColumnsView = require '../../../../components/artwork_columns/view.coffee'
{ setSkipLabel } = require '../mixins/followable.coffee'

template = -> require('../../templates/favorites.jade') arguments...

module.exports = class FavoritesView extends StepView
  _.extend @prototype, Genes

  setSkipLabel: setSkipLabel

  events:
    'click .personalize-skip': 'advance'

  initialize: (options) ->
    super

    @initializeGenes size: 5, success: => @fetchArtworks()

  fetchArtworks: ->
    @artworks = new Artworks
    $.when.apply(null, @genes.map (gene) =>
      gene.fetchArtworks
        data: size: 10
        success: (collection, response, options) =>
          @artworks.add response
    ).then =>
      @setupFavorites()
      @artworks.reset @artworks.shuffle(), silent: true
      @renderArtworks()

  setupFavorites: ->
    @user.initializeDefaultArtworkCollection()
    @favorites = @user.defaultArtworkCollection()
    @listenTo @favorites, 'artworksFetched', =>
      @favoriteArtworks = @favorites.get 'artworks'
      @user.artistsFromFavorites = new Artists(@favoriteArtworks.map (favorite) => @artworks.get(favorite.id).get('artist'))
      @listenToOnce @favoriteArtworks, 'add remove', @setSkipLabel, this
      @listenTo @favoriteArtworks, 'add', (favorite) =>
        @user.artistsFromFavorites.add @artworks.get(favorite.id).get('artist')

  renderArtworks: ->
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

  # Disable links to the artworks and delegate to the favorite button
  disableArtworkLinks: ->
    @$('.artwork-item-image-link')
      .attr('href', null)
      .click -> $(this).find('.overlay-button-save').click()

  # Fades in a column of hearts at a time
  fadeInHearts: ->
    $buttonColumns = _.map @artworkColumnsView.$columns, (column) ->
      $(column).find('.overlay-button-save').css 'opacity', 0
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
