_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
RemoveConfirmModal = require './remove_confirm_modal.coffee'
EditCollectionModal = require './edit_collection_modal.coffee'
analytics = require '../../../lib/analytics.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../artwork_columns/view.coffee'
ShareView = require '../../share/view.coffee'
ZigZagBanner = require '../../zig_zag_banner/index.coffee'
FavoritesEmptyStateView = require './empty_state.coffee'
JumpView = require '../../jump/view.coffee'
mediator = require '../../../lib/mediator.coffee'
Cookies = require 'cookies-js'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
hintTemplate = -> require('../templates/empty_hint.jade') arguments...
collectionsTemplate = -> require('../templates/collections.jade') arguments...

module.exports.FavoritesView = class FavoritesView extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    @collections = new ArtworkCollections [], user: @user
    @shareView = new ShareView
      el: @$('.favorites2-share')
    @artworkColumnsView = new ArtworkColumnsView
      el: @$('.favorites2-artworks-list')
      collection: new Artworks
      numberOfColumns: 4
      gutterWidth: 40
      totalWidth: @$('.favorites2-artworks-list').width()
      artworkSize: 'tall'
      allowDuplicates: true
    @jump = new JumpView threshold: $(window).height()
    @$el.append @jump.$el.addClass 'jump-from-bottom'
    mediator.on 'create:artwork:collection', (col) => @collections.add col
    @collections.on 'add remove change:name sync remove:artwork', => _.defer @renderCollections
    @collections.on 'next:artworks', (a) =>
      @artworkColumnsView.appendArtworks a
    @collections.on 'end:artworks', @endInfiniteScroll
    @collections.on 'remove:artwork', @onRemoveArtwork
    @$el.infiniteScroll @collections.fetchNextArtworksPage
    @setup()

  setup: ->
    @collections.fetch success: =>
      @setupForTwoButton()
      return @showEmptyHint() if @collections.length is 0
      @renderPrivacy()
      @collections.fetchNextArtworksPage success: =>
        total = _.reduce @collections.map((c) -> c.artworks.length), (m, num) -> m + num
        @renderCollections()
        @renderFirstZigZagBanner()
        @showEmptyHint() if total is 0

  setupForTwoButton: ->
    return unless (Cookies.get('save-controls') or analytics.getProperty('ab:save:controls')) is 'two button'
    @collections.remove favorites = @collections.get('saved-artwork')
    @$('.favorites2-tabs').show()
    @favoritesView = new ArtworkColumnsView
      el: @$('.favorites2-favorites-artworks')
      collection: new Artworks
      numberOfColumns: 4
      gutterWidth: 40
      totalWidth: @$('.favorites2-artworks-list').width()
      artworkSize: 'tall'
    page = 0
    nextPage = =>
      page++
      new Artworks().fetch
        url: favorites.artworks.url
        data: { private: true, page: page }
        success: (col, res) =>
          @favoritesView.appendArtworks col.models
    @$el.infiniteScroll nextPage
    @$('.favorites2-tabs-sets').click => @$el.removeClass('is-in-favorites')
    @$('.favorites2-tabs-favorites').click =>
      @$el.addClass('is-in-favorites')
      nextPage()

  onRemoveArtwork: (artwork, col) =>
    @$("[data-id='#{artwork.get 'id'}']" +
       "[data-collection-id='#{col.get 'id'}']")
      .closest('.artwork-item').remove()

  renderPrivacy: ->
    @$('.favorites2-privacy').attr 'data-state',
        if @collections.public() then 'public' else 'private'

  showEmptyHint: ->
    new FavoritesEmptyStateView el: @$('.favorites2-artworks-list')
    @endInfiniteScroll()
    @$('.favorites2-artworks-spinner').remove()

  endInfiniteScroll: =>
    @$('.favorites2-artworks-spinner').css opacity: 0
    $(window).off 'infiniteScroll'

  renderCollections: =>
    @$('.favorites2-collections').html collectionsTemplate
      collections: @collections.models
      user: @user

  renderFirstZigZagBanner: ->
    @firstZigZagBanner = new ZigZagBanner
      name: 'favorites_new_set'
      message: 'Get started by creating a new set.'
      $target: @$('.grid-item').first()
      backwards: true

  renderSecondZigZagBanner: ->
    @secondZigZagBanner = new ZigZagBanner
      name: 'favorites_save_work'
      message: 'Great, now save a work into your new set.'
      $target: @$('.artwork-item').first()
      backwards: true
    @secondZigZagBanner.$el?.css marginTop: 0

  events:
    'click .favorites2-new-collection': 'openNewModal'
    'click .favorites2-edit': 'openEditModal'
    'click .favorites2-privacy a': 'togglePrivacy'
    'click .artwork-item-remove': 'removeWork'

  openNewModal: (e) ->
    e?.preventDefault()
    @firstZigZagBanner.close() if @firstZigZagBanner.$el.is(':visible')
    collection = new ArtworkCollection user_id: @user.get('id')
    new EditCollectionModal width: 500, collection: collection
    collection.once 'request', =>
      @collections.add collection
      @renderSecondZigZagBanner()

  openEditModal: (e) ->
    e.preventDefault()
    collection = @collections.get $(e.currentTarget).data('id')
    new EditCollectionModal width: 500, collection: collection

  togglePrivacy: ->
    @collections.togglePrivacy()
    @renderPrivacy()

  removeWork: (e) ->
    e.preventDefault()
    new RemoveConfirmModal
      width: 550
      collections: @collections
      artworkId: $(e.currentTarget).data 'id'