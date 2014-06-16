_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Profile = require '../../../models/profile.coffee'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
ShareView = require '../../../components/share/view.coffee'
ShareModal = require '../../../components/share/modal.coffee'
EditCollectionModal = require '../../../components/favorites2/client/edit_collection_modal.coffee'
EditWorkModal = require '../../../components/favorites2/client/edit_work_modal.coffee'
FeaturedLinks = require '../../../collections/featured_links.coffee'
emptyTemplate = -> require('../templates/collection_empty.jade') arguments...
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
{ COLLECTION, PROFILE, API_URL, EMPTY_COLLECTION_SET_ID, USER } = require('sharify').data

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
    @$el.infiniteScroll @nextPage
    @artworkCollection.on 'change:name', @renderName
    @artworkCollection.artworks.on 'remove', @onRemove
    @artworkCollection.on 'destroy', @redirectAfterDestroy
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

  renderName: =>
    @$('h1').text @artworkCollection.get 'name'

  nextPage: =>
    @page++
    @artworkCollection.artworks.fetch
      data: page: @page, access_token: @user?.get('accessToken'), private: true
      remove: false
      success: (col, res) =>
        return @endInfiniteScroll() if res.length is 0
        @columnsView.appendArtworks new Artworks(res).models

  renderEmpty: ->
    new FeaturedLinks().fetch
      url: "#{API_URL}/api/v1/set/#{EMPTY_COLLECTION_SET_ID}/items"
      success: (featuredLinks) =>
        @$('#user-profile-collection-artworks').html(
          emptyTemplate featuredLinks: _.sample(featuredLinks.models, 4)
        )

  endInfiniteScroll: =>
    @$('#user-profile-collection-artworks-spinner').hide()
    @$el.off 'infiniteScroll'

  events:
    'click #user-profile-collection-right-edit': 'openEditModal'
    'click #user-profile-collection-right-share': 'openShareModal'
    'click .artwork-item-edit': 'openEditWorkModal'

  openEditModal: (e) ->
    new EditCollectionModal width: 500, collection: @artworkCollection
    false

  openShareModal: ->
    new ShareModal
      width: '350px'
      media: @artworkCollection.artworks.first()?.defaultImageUrl('large')
      description: @artworkCollection.get('name')
    false

  openEditWorkModal: (e) ->
    e.preventDefault()
    new EditWorkModal
      width: 550
      artwork: @artworkCollection.artworks.get($(e.currentTarget).attr 'data-id')
      collection: @artworkCollection

module.exports.init = ->
  new CollectionView
    profile: new Profile PROFILE
    user: CurrentUser.orNull()
    artworkCollection: new ArtworkCollection(
      _.extend COLLECTION, user_id: PROFILE.owner.id
    )
    el: $('#user-profile-collection')