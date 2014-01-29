_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
CurrentUser             = require '../../../models/current_user.coffee'
Artworks                = require '../../../collections/artworks.coffee'
hintTemplate            = -> require('../templates/empty_hint.jade') arguments...
favoritesStatusTemplate = -> require('../templates/favorites_status.jade') arguments...
SaveControls            = require '../../../components/artwork_item/save_controls.coffee'
ArtworkColumnsView      = require '../../../components/artwork_columns/view.coffee'
SuggestedGenesView      = require '../../../components/suggested_genes/view.coffee'
ShareView               = require '../../../components/share/view.coffee'
FavoritesStatusModal    = require '../../../components/favorites_status_modal/view.coffee'
mediator                = require '../../../lib/mediator.coffee'

module.exports.FavoritesView = class FavoritesView extends Backbone.View

  defaults:
    pageSize: 10
    nextPage: 1 # page number of the next page to render

  events:
    'click .make-public'  : 'makePublic'
    'click .make-private' : 'makePrivate'

  initialize: (options) ->
    { @pageSize, @nextPage } = _.defaults options or {}, @defaults
    @setupCurrentUser()

    @collection ?= new Artworks()

    @$favoriteArtworks = @$('.favorite-artworks')
    @$loadingSpinner = @$('.loading-spinner')
    @initializeArtworkColumns()
    @loadNextPage()
    @setupStatus()
    @setupShareButton()

  initializeArtworkColumns: ->
    @artworkColumnsView = new ArtworkColumnsView
      el: @$favoriteArtworks
      collection: @collection

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()

  setupStatus: ->
    @savedArtworkCollection = new Backbone.Model()
    @listenTo @savedArtworkCollection, 'change:private', @renderStatus
    @savedArtworkCollection.url = "#{sd.ARTSY_URL}/api/v1/collection/saved-artwork"
    @savedArtworkCollection.fetch
      data: { user_id: @currentUser.get('id'), private: true }
      success: =>
        @showStatusDialog() unless not @savedArtworkCollection.get('private')
    mediator.on 'favorites:make:public', @makePublic, this
    # intercept click events before bubbling up to ShareView
    @$('[class^="share-to-"]').on 'click', @checkStatusBeforeSharing

  setupShareButton: ->
    new ShareView el: @$('.favorites-share')

  loadNextPage: =>
    @fetchNextPageSavedArtworks
      success: (collection) =>
        @doneRenderLoading()

        if @nextPage is 1
          $(window).on 'scroll.favorites', _.throttle(@infiniteScroll, 150)
          @showEmptyHint() unless collection.length > 0

        else if collection.length < 1
          return $(window).off('.favorites')

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
    collection = @collection
    url = "#{sd.ARTSY_URL}/api/v1/collection/saved-artwork/artworks"
    data =
      user_id: @currentUser.get('id')
      page: @nextPage
      size: @pageSize
      sort: "-position"
      private: true
    collection.fetch
      url: url
      data: data
      success: options?.success
      error: options?.error

  showEmptyHint: ->
    @$('.follows-empty-hint').html $( hintTemplate type: 'artworks' )
    (new SuggestedGenesView
      el: @$('.suggested-genes')
      user: @currentUser
    ).render()

  makePrivate: ->
    window.location = "/profile/edit"

  makePublic: ->
    @savedArtworkCollection.set(private: false).save user_id: @currentUser.get('id')

  showStatusDialog: ->
    new FavoritesStatusModal width: '400px'

  renderStatus: () ->
    status = @savedArtworkCollection.get('private')
    @$('.favorites-privacy').html $( favoritesStatusTemplate private: status )

  # Check the favorites status and show the status dialog instead of
  # sharing window if it's private.
  checkStatusBeforeSharing: (e) =>
    e.preventDefault()

    if @savedArtworkCollection.get('private')
      @showStatusDialog()
      e.stopPropagation()

  renderLoading: -> @$loadingSpinner.show()
  doneRenderLoading: -> @$loadingSpinner.hide()

module.exports.init = ->
  new FavoritesView el: $('#favorites')
