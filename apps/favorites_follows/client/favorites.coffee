_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
CurrentUser             = require '../../../models/current_user.coffee'
Artworks                = require '../../../collections/artworks.coffee'
hintTemplate            = -> require('../templates/empty_hint.jade') arguments...
SaveControls            = require '../../../components/artwork_item/save_controls.coffee'
ArtworkColumnsView      = require '../../../components/artwork_columns/view.coffee'
SuggestedGenesView      = require '../../../components/suggested_genes/view.coffee'

module.exports.FavoritesView = class FavoritesView extends Backbone.View
  defaults:
    numOfCols: 3
    numOfRowsPerPage: 3
    nextPage: 1 # page number of the next page to render

  initialize: (options) ->
    { @numOfCols, @numOfRowsPerPage, @nextPage } = _.defaults options or {}, @defaults
    @collection ?= new Artworks()
    @setupCurrentUser()
    @listenTo @collection, 'request', @renderLoading
    @loadNextPage()

  renderLoading: ->
    unless @$('.favorite-artworks .loading-spinner').length > 0
      @$('.favorite-artworks').append '<div class="loading-spinner"></div>'

  doneRenderLoading: ->
    @$('.favorite-artworks .loading-spinner').remove()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  loadNextPage: =>
    @fetchNextPageSavedArtworks success: (col, res) =>
      # some setups for the first page
      if @nextPage is 1
        @showEmptyHint() unless res.length > 0
        $(window).bind 'scroll.following', _.throttle(@infiniteScroll, 150) unless res.length < @numOfCols * @numOfRowsPerPage
      # try unbind following event for following pages
      else if res.length < @numOfCols * @numOfRowsPerPage or res.length is 0
        $(window).unbind('.following')
      @doneRenderLoading()
      end = @numOfCols * @numOfRowsPerPage * @nextPage # 0-indexed, not including
      start = end - @numOfCols * @numOfRowsPerPage
      return unless @collection.length > start
      @artworkColumnsView ?= new ArtworkColumnsView
        el: @$('.favorite-artworks')
        collection: @collection
        isOrdered: true
      artworks = @collection.slice start, end
      @artworkColumnsView.appendArtworks artworks unless @nextPage is 1
      ++@nextPage

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.favorite-artworks')
    @loadNextPage() unless fold < $lastItem.offset()?.top + $lastItem.height()

  #
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

  showEmptyHint: () ->
    @$('.follows-empty-hint').html $( hintTemplate type: 'artworks' )
    (new SuggestedGenesView
      el: @$('.suggested-genes')
      user: @currentUser
    ).render()

module.exports.init = ->
  new FavoritesView el: $('body')
