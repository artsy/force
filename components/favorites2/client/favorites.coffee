_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
EditWorkModal = require './edit_work_modal.coffee'
EditCollectionModal =  require './edit_collection_modal.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
ArtworkColumnsView = require '../../artwork_columns/view.coffee'
SuggestedGenesView = require '../../suggested_genes/view.coffee'
ShareView = require '../../share/view.coffee'
ZigZagBanner = require '../../zig_zag_banner/index.coffee'
mediator = require '../../../lib/mediator.coffee'
hintTemplate = -> require('../templates/empty_hint.jade') arguments...
collectionsTemplate = -> require('../templates/collections.jade') arguments...

module.exports.FavoritesView = class FavoritesView extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    @collections = new ArtworkCollections [], user: @user
    @shareView = new ShareView el: @$('.favorites2-share')
    @artworkColumnsView = new ArtworkColumnsView
      el: @$('.favorites2-artworks-list')
      collection: new Artworks
      numberOfColumns: 4
      gutterWidth: 40
      totalWidth: @$('.favorites2-artworks-list').width()
      artworkSize: 'tall'
      allowDuplicates: true
    mediator.on 'create:artwork:collection', (col) => @collections.add col
    @collections.on 'add remove change:name sync', => _.defer @renderCollections
    @collections.on 'next:artworks', (a) =>
      @artworkColumnsView.appendArtworks a
    @collections.on 'end:artworks', @endInfiniteScroll
    @collections.on 'destroy:artwork', @onRemoveArtwork
    @$el.infiniteScroll @collections.fetchNextArtworksPage
    @setup()

  setup: ->
    @collections.fetch success: =>
      return @showEmptyHint() if @collections.length is 0
      @renderPrivacy()
      @collections.fetchNextArtworksPage success: =>
        total = @collections.reduce (m, col) ->
          m.artworks?.length + col.artworks?.length
        return @showEmptyHint() if total is 0
        @renderCollections()
        @renderZigZagBanner()

  onRemoveArtwork: (artwork, col) =>
    @$("[data-id='#{artwork.get 'id'}']" +
       "[data-collection-id='#{col.get 'id'}']")
      .closest('.artwork-item').remove()

  renderPrivacy: ->
    @$('.favorites2-privacy').attr 'data-state',
        if @collections.public() then 'public' else 'private'

  showEmptyHint: ->
    @$('.favorites2-follows-empty-hint').html hintTemplate type: 'artworks'
    new SuggestedGenesView(
      el: @$('.suggested-genes')
      user: @user
    ).render()
    @endInfiniteScroll()

  endInfiniteScroll: =>
    @$('.favorites2-artworks-spinner').css opacity: 0
    $(window).off 'infiniteScroll'

  renderCollections: =>
    @$('.favorites2-collections').html collectionsTemplate
      collections: @collections.models
      user: @user

  renderZigZagBanner: ->
    new ZigZagBanner
      persist: true
      name: 'favorites_new_set'
      message: 'Become an Artsy Curator. Create a new set.'
      $target: @$('.favorites2-new-collection')
    @$('.zig-zag-banner').addClass('zig-zag-backwards').css('margin-left': 250)

  events:
    'click .favorites2-new-collection': 'openNewModal'
    'click .favorites2-edit': 'openEditModal'
    'click .artwork-item-edit': 'openEditWorkModal'
    'click .favorites2-privacy a': 'togglePrivacy'

  openNewModal: (e) ->
    e.preventDefault()
    collection = new ArtworkCollection user_id: @user.get('id')
    new EditCollectionModal width: 500, collection: collection
    collection.once 'request', => @collections.add collection

  openEditModal: (e) ->
    e.preventDefault()
    collection = @collections.at($(e.currentTarget).parent().index() - 1)
    new EditCollectionModal width: 500, collection: collection

  openEditWorkModal: (e) ->
    e.preventDefault()
    collection = @collections.get $(e.currentTarget).data 'collection-id'
    artwork = collection.artworks.get $(e.currentTarget).data 'id'
    new EditWorkModal
      width: 550
      collection: collection
      artwork: artwork

  togglePrivacy: ->
    @collections.togglePrivacy()
    @renderPrivacy()