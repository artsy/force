_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
ShareView = require '../../../components/share/view.coffee'
ShareModal = require '../../../components/share/modal.coffee'
EditCollectionModal = require '../../../components/favorites2/client/edit_collection_modal.coffee'
EditWorkModal = require '../../../components/favorites2/client/edit_work_modal.coffee'
FeaturedLinks = require '../../../collections/featured_links.coffee'
emptyTemplate = -> require('../templates/collection_empty.jade') arguments...
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
{ COLLECTION, PROFILE, API_URL, EMPTY_COLLECTION_SET_ID } = require('sharify').data

module.exports.CollectionView = class CollectionView extends Backbone.View

  initialize: (options) ->
    { @artworkCollection } = options
    @page = 0
    @columnsView = new ArtworkColumnsView
      el: @$('#user-profile-collection-artworks')
      collection: @artworks = new Artworks
      artworkSize: 'larger'
      numberOfColumns: 3
      gutterWidth: 80
    @$el.infiniteScroll @nextPage
    @artworkCollection.on 'change:name', @renderName
    @artworkCollection.artworks.on 'remove', @onRemove
    @nextPage()?.then (res) => @renderEmpty() if res.length is 0

  onRemove: (artwork) =>
    @artworks.remove artwork.get('id')
    @renderEmpty() if @artworkCollection.artworks.length is 0

  renderName: =>
    @$('h1').text @artworkCollection.get 'name'

  nextPage: =>
    @page++
    @artworkCollection.artworks.fetch
      data: page: @page
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
    artworkCollection: new ArtworkCollection(
      _.extend COLLECTION, user_id: PROFILE.owner.id
    )
    el: $('#user-profile-collection')