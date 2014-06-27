_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Profile = require '../../../models/profile.coffee'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
ShareView = require '../../../components/share/view.coffee'
ShareModal = require '../../../components/share/modal.coffee'
RemoveConfirmModal = require '../../../components/favorites2/client/remove_confirm_modal.coffee'
EditCollectionModal = require '../../../components/favorites2/client/edit_collection_modal.coffee'
FavoritesEmptyStateView = require '../../../components/favorites2/client/empty_state.coffee'
Slideshow = require './slideshow.coffee'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
{ COLLECTION, PROFILE } = require('sharify').data

module.exports.CollectionView = class CollectionView extends Backbone.View

  initialize: (options) ->
    { @artworkCollection, @user, @profile } = options
    @page = 0
    @columnsView = new ArtworkColumnsView
      el: @$('#user-profile-collection-artworks')
      collection: @artworkCollection.artworks
      artworkSize: 'larger'
      numberOfColumns: 3
      gutterWidth: 80
      allowDuplicates: true
    @slideshow = new Slideshow
      el: @$el
      artworks: @artworkCollection.artworks
    @slideshow.on 'next:page', @nextPage
    $.onInfiniteScroll @nextPage
    @artworkCollection.on 'change:name', @renderName
    @artworkCollection.artworks.on 'remove', @onRemove
    @artworkCollection.artworks.on 'sync', @onSync
    @artworkCollection.on 'destroy', => @artworkCollection.once 'sync', @redirectAfterDestroy
    @nextPage()?.then (res) => @renderEmpty() if res.length is 0

  redirectAfterDestroy: =>
    window.location = (
      if @user.get('default_profile_id') is @profile.get('id') then '/favorites' \
      else '/' + @user.get('default_profile_id') + '/favorites'
    )

  onRemove: (artwork) =>
    @artworkCollection.artworks.remove artwork.get('id')
    if @artworkCollection.artworks.length is 0
      @columnsView.remove()
      @renderEmpty()
    else
      @columnsView.render()

  onSync: (c, res) =>
    @columnsView.appendArtworks(
      new Artworks(res, artworkCollection: @artworkCollection).models
    )
    @$('#upc-artworks-total').html "#{@artworkCollection.artworks.totalCount} works"

  renderEmpty: ->
    @$('#user-profile-collection-right-slideshow').hide()
    new FavoritesEmptyStateView el: @$('#user-profile-collection-artworks')

  renderName: =>
    @$('h1').text @artworkCollection.get 'name'

  nextPage: =>
    @page++
    @artworkCollection.artworks.fetch
      data: page: @page, access_token: @user?.get('accessToken'), private: true
      remove: false
      success: (col, res) =>
        return @endInfiniteScroll() if res.length is 0

  endInfiniteScroll: =>
    @$('#user-profile-collection-artworks-spinner').hide()
    @$el.off 'infiniteScroll'

  events:
    'click #user-profile-collection-right-edit': 'openEditModal'
    'click #user-profile-collection-right-share': 'openShareModal'
    'click .artwork-item-remove': 'removeWork'

  openShareModal: ->
    new ShareModal
      width: '350px'
      media: @artworkCollection.artworks.first()?.defaultImageUrl('large')
      description: @artworkCollection.get('name')
    false

  removeWork: (e) ->
    e.preventDefault()
    new RemoveConfirmModal
      width: 550
      collection: @artworkCollection
      artwork: @artworkCollection.artworks.get $(e.currentTarget).data 'id'

module.exports.init = ->
  new CollectionView
    profile: new Profile PROFILE
    user: CurrentUser.orNull()
    artworkCollection: new ArtworkCollection(
      _.extend COLLECTION, user_id: PROFILE.owner.id
    )
    el: $('#user-profile-collection')