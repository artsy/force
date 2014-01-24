_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
CurrentUser             = require '../../../models/current_user.coffee'
ArtworkCollection       = require '../../../models/artwork_collection.coffee'
Artworks                = require '../../../collections/artworks.coffee'
artworkColumns          = -> require('../../../components/artwork_columns/template.jade') arguments...
hintTemplate            = -> require('../templates/empty_hint.jade') arguments...
ShareView               = require '../../../components/share/view.coffee'
SaveControls            = require '../../../components/artwork_item/save_controls.coffee'
RecommendedGenesView    = require '../../../components/recommended_genes/view.coffee'

module.exports.FavoritesView = class FavoritesView extends Backbone.View
  defaults:
    numOfCols: 3
    numOfRowsPerPage: 3
    nextPage: 1 # page number of the next page to render

  initialize: (options) ->
    { @numOfCols, @numOfRowsPerPage, @nextPage } = _.defaults options or {}, @defaults
    @collection ?= new Artworks()
    @setupCurrentUser()
    @fetchAllSavedArtworks success: =>
      @showEmptyHint() unless @collection.length > 0
      if @collection.length > @numOfCols * @numOfRowsPerPage
        $(window).bind 'scroll.following', _.throttle(@infiniteScroll, 150)
      @loadNextPage()
    @shareView = new ShareView el: @$('.favorites-share')

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  loadNextPage: =>
    end = @numOfCols * @numOfRowsPerPage * @nextPage # 0-indexed, not including
    start = end - @numOfCols * @numOfRowsPerPage
    return unless @collection.length > start
    console.log "Loading page ##{@nextPage} (#{start}, #{end}], @collection has #{@collection.length} artworks."
    console.log "Rendering page ##{@nextPage}\n"
    artworks = new Artworks @collection.slice start, end
    @renderArtworks artworks
    @setupArtworkSaveControls artworks
    ++@nextPage

  infiniteScroll: =>
    console.log "Infinite scrolling..."
    $(window).unbind('.following') unless @numOfCols * @numOfRowsPerPage * (@nextPage - 1) < @collection.length
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.favorite-artworks')
    @loadNextPage() unless fold < $lastItem.offset()?.top + $lastItem.height()

  # Fetch all saved artworks and save them to @collection
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  fetchAllSavedArtworks: (options) ->
    url = "#{sd.ARTSY_URL}/api/v1/collection/saved-artwork/artworks"
    data =
      user_id: @currentUser.get('id')
      private: true
    @collection.fetchUntilEnd _.extend { url: url, data: data }, options

  # Fetch the next page of saved artworks and (blindly) append them to @collection
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  fetchNextPageSavedArtworks: (options) ->
    url = "#{sd.ARTSY_URL}/api/v1/collection/saved-artwork/artworks"
    data =
      user_id: @currentUser.get('id')
      page: @nextPage
      size: @numOfCols * @numOfRowsPerPage
      private: true
    @collection.fetch _.extend { url: url, data: data, add: true, remove: false, merge: false }, options

  setupArtworkSaveControls: (artworkCollection) ->
    for artwork in artworkCollection.models
      overlay = @$(".artwork-item[data-artwork='#{artwork.get('id')}']").find('.overlay-container')
      new SaveControls
        artworkCollection: @artworkCollection
        el               : overlay
        model            : artwork
    if @artworkCollection
      @artworkCollection.addRepoArtworks artworkCollection
      @artworkCollection.syncSavedArtworks()

  renderArtworks: (artworks) ->
    @$('.favorite-artworks').append artworkColumns artworkColumns: artworks.groupByColumnsInOrder(3)

  showEmptyHint: () ->
    @$('.follows-empty-hint').html $( hintTemplate type: 'artworks' )
    (new RecommendedGenesView
      el: @$('.suggested-genes')
      user: @currentUser
    ).render()

module.exports.init = ->
  new FavoritesView el: $('body')
