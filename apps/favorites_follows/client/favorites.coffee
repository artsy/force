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

  pageSize: 10
  nextPage: 1 # page number of the next page to render

  initialize: (options) ->
    @collection ?= new Artworks()
    @setupCurrentUser()

    @$favoriteArtworks = @$('.favorite-artworks')
    @$loadingSpinner = @$('.loading-spinner')
    @initializeArtworkColumns()
    @loadNextPage()

  initializeArtworkColumns: ->
    @artworkColumnsView = new ArtworkColumnsView
      el: @$favoriteArtworks
      collection: @collection

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()

  loadNextPage: =>
    @fetchNextPageSavedArtworks
      success: (collection) =>
        @doneRenderLoading()

        if @nextPage is 1
          $(window).on 'scroll.favorites', _.throttle(@infiniteScroll, 150)

        else if collection.length < 1
          $(window).off('.favorites')

        @artworkColumnsView.appendArtworks collection.models
        ++@nextPage

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    @loadNextPage() unless fold < @$favoriteArtworks.offset()?.top + @$favoriteArtworks.height()

  #
  # Fetch the next page of saved artworks and (blindly) append them to @collection
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  fetchNextPageSavedArtworks: (options) ->
    collection = new Artworks
    url = "#{sd.ARTSY_URL}/api/v1/collection/saved-artwork/artworks"
    data =
      user_id: @currentUser.get('id')
      page: @nextPage
      size: @pageSize
      sort: "-position"
      private: true
    collection.fetch _.extend { url: url, data: data, add: true, remove: false, merge: false }, options

  showEmptyHint: () ->
    @$('.follows-empty-hint').html $( hintTemplate type: 'artworks' )
    (new SuggestedGenesView
      el: @$('.suggested-genes')
      user: @currentUser
    ).render()

  renderLoading: -> @$loadingSpinner.show()
  doneRenderLoading: -> @$loadingSpinner.hide()

module.exports.init = ->
  new FavoritesView el: $('#favorites')
