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

  initialize: (options) ->
    { @pageSize, @nextPage } = _.defaults options or {}, @defaults
    @setupCurrentUser()

    @collection ?= new Artworks() # Maintain all saved artworks fetched so far

    @$favoriteArtworks = @$('.favorite-artworks')
    @$loadingSpinner = @$('.loading-spinner')
    @initializeArtworkColumns()
    @loadNextPage()
    @setupStatus()
    @setupShareButton()

  initializeArtworkColumns: ->
    minWidth = 850
    maxWidth = 1120
    containerWidth = @$favoriteArtworks.width()
    width = Math.max(minWidth, Math.min(containerWidth, maxWidth))
    @artworkColumnsView = new ArtworkColumnsView
      el: @$favoriteArtworks
      collection: @collection
      numberOfColumns: 4
      gutterWidth: 40
      totalWidth: width

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

  loadNextPage: ->
    @fetchNextPageSavedArtworks
      success: (collection, response, options) =>
        @isFetching = false
        @doneRenderLoading()

        page = options?.data?.page or @nextPage # fetched page

        if page is 1
          $(window).on 'scroll.favorites', _.throttle(@infiniteScroll, 150)
          @showEmptyHint() unless collection.length > 0

        if collection.length is 0
          $(window).off('.favorites')
        else
          @artworkColumnsView.appendArtworks collection.models
          @nextPage = page + 1

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    @loadNextPage() unless fold < @$favoriteArtworks.offset()?.top + @$favoriteArtworks.height()

  #
  # Fetch the next page of saved artworks and (blindly) append them to @collection
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  fetchNextPageSavedArtworks: (options) ->
    return if @isFetching
    @isFetching = true

    url = "#{sd.ARTSY_URL}/api/v1/collection/saved-artwork/artworks"
    data =
      user_id: @currentUser.get('id')
      page: @nextPage
      size: @pageSize
      sort: "-position"
      private: true
    @collection.fetch
      url: url
      data: data
      remove: true
      merge: false
      success: options?.success
      error: options?.error

  showEmptyHint: ->
    @$('.follows-empty-hint').html $( hintTemplate type: 'artworks' )
    (new SuggestedGenesView
      el: @$('.suggested-genes')
      user: @currentUser
    ).render()

  makePublic: ->
    @savedArtworkCollection.set(private: false).save user_id: @currentUser.get('id')

  showStatusDialog: ->
    new FavoritesStatusModal
      top: @$('.favorites-actions').offset().top + 'px'
      width: '350px'

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
