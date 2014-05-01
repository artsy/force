_                       = require 'underscore'
Backbone                = require 'backbone'
sd                      = require('sharify').data
CurrentUser             = require '../../../models/current_user.coffee'
Artworks                = require '../../../collections/artworks.coffee'
hintTemplate            = -> require('../templates/empty_hint.jade') arguments...
favoritesStatusTemplate = -> require('../templates/favorites_status.jade') arguments...
SaveControls            = require '../../../components/artwork_item/views/save_controls.coffee'
ArtworkColumnsView      = require '../../../components/artwork_columns/view.coffee'
SuggestedGenesView      = require '../../../components/suggested_genes/view.coffee'
ShareView               = require '../../../components/share/view.coffee'
FavoritesStatusModal    = require '../../../components/favorites_status_modal/view.coffee'
mediator                = require '../../../lib/mediator.coffee'

module.exports.FavoritesView = class FavoritesView extends Backbone.View

  defaults:
    pageSize: 10

  events:
    'click .make-public'  : 'makePublic'

  initialize: (options) ->
    { @pageSize } = _.defaults options or {}, @defaults
    @setupCurrentUser()

    @collection ?= new Artworks()
    @listenTo @collection, "request", @renderLoading
    @listenTo @collection, "sync", @doneRenderLoading
    @listenTo @collection, "sync", @render

    @params = new Backbone.Model
      size: @pageSize
      sort: "-position"
      private: true
      user_id: @currentUser.get('id')
    @params.on 'change:page', =>
      @collection.fetch
        url: "#{sd.ARTSY_URL}/api/v1/collection/saved-artwork/artworks"
        data: @params.toJSON()

    @$favoriteArtworks = @$('.favorite-artworks')
    @$loadingSpinner = @$('.favorite-artworks .loading-spinner')
    @initializeArtworkColumns()
    @loadNextPage(); @$el.infiniteScroll @loadNextPage
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
      artworkSize: 'tall'
      allowDuplicates: true

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
        @showStatusDialog() if @savedArtworkCollection.get('private')
      error: =>
        @renderStatus()
    mediator.on 'favorites:make:public', @makePublic, this
    # intercept click events before bubbling up to ShareView
    @$('[class^="share-to-"]').on 'click', @checkStatusBeforeSharing

  setupShareButton: ->
    new ShareView el: @$('.favorites-share')

  render: (col, res) =>
    @$favoriteArtworks.attr 'data-state',
      if      col.length is 0 and @params.get('page') is 1 then 'no-results'
      else if col.length is 0 then 'finished-paging'
      else ''
    @artworkColumnsView.appendArtworks col.models if col.length > 0
    @showEmptyHint() if @$favoriteArtworks.attr('data-state') is 'no-results'

  # $.fn.infiniteScroll callback
  loadNextPage: =>
    return if @$favoriteArtworks.attr('data-state') is 'no-results' or
              @$favoriteArtworks.attr('data-state') is 'finished-paging'
    @params.set page: (@params.get('page') + 1) or 1

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
    isPrivate = @savedArtworkCollection.get('private') ? true
    @$('.favorites-privacy').html $( favoritesStatusTemplate private: isPrivate)

  # Check the favorites status and show the status dialog instead of
  # sharing window if it's private.
  checkStatusBeforeSharing: (e) =>
    e.preventDefault()

    if @savedArtworkCollection.get('private') ? true
      @showStatusDialog()
      e.stopPropagation()

  renderLoading: ->
    unless @$loadingSpinner.length is 0
      @$favoriteArtworks.append( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()
  doneRenderLoading: -> @$loadingSpinner.hide()

module.exports.init = ->
  new FavoritesView el: $('#favorites')
