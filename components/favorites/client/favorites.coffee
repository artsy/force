_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
CurrentUser             = require '../../../models/current_user.coffee'
Artwork                 = require '../../../models/artwork.coffee'
Artworks                = require '../../../collections/artworks.coffee'
hintTemplate            = -> require('../templates/empty_hint.jade') arguments...
favoritesStatusTemplate = -> require('../templates/favorites_status.jade') arguments...
SaveControls            = require '../../../components/artwork_item/views/save_controls.coffee'
ArtworkColumnsView      = require '../../../components/artwork_columns/view.coffee'
SuggestedGenesView      = require '../../../components/suggested_genes/view.coffee'
ShareView               = require '../../../components/share/view.coffee'
PublishModal            = require '../../../components/publish_modal/view.coffee'
mediator                = require '../../../lib/mediator.coffee'

module.exports.UserFavorites = class UserFavorites extends Artworks

  model: Artwork

  initialize: (models, options) ->
    { @user } = options
    @page = 0

  fetchCollections: (options) =>
    new Backbone.Collection().fetch
      url: "#{sd.API_URL}/api/v1/collections"
      data: user_id: @user.get 'id'
      success: (@collections) =>
        options.success?()

  fetchNextPage: =>
    @page++
    nextPageArtworks = new Artworks
    done = _.after @collections.length, =>
      @set nextPageArtworks, remove: false
      @trigger 'nextPage', nextPageArtworks
      @trigger 'end' if nextPageArtworks.length is 0
    @collections.each (collection) =>
      new Artworks().fetch
        url: "#{sd.API_URL}/api/v1/collection/#{collection.get 'id'}/artworks"
        data:
          size: 10
          sort: "-position"
          private: true
          user_id: @user.get('id')
          page: @page
        complete: done
        success: (artworks) =>
          nextPageArtworks.add artworks.models

module.exports.FavoritesView = class FavoritesView extends Backbone.View

  defaults:
    pageSize: 10

  events:
    'click .make-public'  : 'makePublic'

  initialize: (options) ->
    { @pageSize } = _.defaults options or {}, @defaults
    @$favoriteArtworks = @$('.favorite-artworks')
    @$window = $(window)
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()

    # Setup and all favorites collection and listen to events for infinite scroll
    @favorites = new UserFavorites [], user: @currentUser
    @favorites.on 'nextPage', @onNextPage
    @favorites.on 'end', @onEnd
    @$el.infiniteScroll @favorites.fetchNextPage

    # Setup initial render
    @initializeArtworkColumns()
    @favorites.fetchCollections success: => @favorites.fetchNextPage()
    @setupStatus()
    @setupShareButton()

  #
  # Methods for the initial "Would you like to make favorites public?" dialog
  # and "Favorite works are Public" toggle
  #

  setupStatus: ->
    @savedArtworkCollection = new Backbone.Model()
    @listenTo @savedArtworkCollection, 'change:private', @renderStatus
    @savedArtworkCollection.url = "#{sd.API_URL}/api/v1/collection/saved-artwork"
    @savedArtworkCollection.fetch
      data: { user_id: @currentUser.get('id'), private: true }
      success: =>
        @showStatusDialog() if @savedArtworkCollection.get('private')
      error: =>
        @renderStatus()
    mediator.on 'favorites:make:public', @makePublic, this
    # intercept click events before bubbling up to ShareView
    @$('[class^="share-to-"]').on 'click', @checkStatusBeforeSharing

  # Check the favorites status and show the status dialog instead of
  # sharing window if it's private.
  checkStatusBeforeSharing: (e) =>
    e.preventDefault()
    if @savedArtworkCollection.get('private') ? true
      @showStatusDialog()
      e.stopPropagation()

  renderStatus: () ->
    isPrivate = @savedArtworkCollection.get('private') ? true
    @$('.favorites-privacy').html $( favoritesStatusTemplate private: isPrivate)

  showStatusDialog: ->
    new PublishModal
      persist      : true
      width        : '350px'
      name         : 'favorites_publish_prompt'
      publishEvent : 'favorites:make:public'
      message      : 'Your favorites need to be public to share. Make them public now?'

  makePublic: ->
    @savedArtworkCollection.set(private: false).save user_id: @currentUser.get('id')

  #
  # Initial rendering methods
  #

  showEmptyHint: ->
    @$('.follows-empty-hint').html $( hintTemplate type: 'artworks' )
    (new SuggestedGenesView
      el: @$('.suggested-genes')
      user: @currentUser
    ).render()

  initializeArtworkColumns: ->
    minWidth = 850
    maxWidth = 1120
    containerWidth = @$favoriteArtworks.width()
    width = Math.max(minWidth, Math.min(containerWidth, maxWidth))
    @artworkColumnsView = new ArtworkColumnsView
      el: @$favoriteArtworks
      collection: @favorites
      numberOfColumns: 4
      gutterWidth: 40
      totalWidth: width
      artworkSize: 'tall'
      allowDuplicates: true

  setupShareButton: ->
    new ShareView el: @$('.favorites-share')

  #
  # Infinite scroll methods
  #

  onNextPage: (col) =>
    @artworkColumnsView.appendArtworks col.models

  onEnd: =>
    @$('.favorite-artworks-spinner').hide()
    @$window.off 'infiniteScroll'
