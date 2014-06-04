_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
{ COLLECTION, PROFILE } = require('sharify').data
EditCollectionModal = require '../../../components/favorites2/client/edit_collection_modal.coffee'

module.exports.CollectionView = class CollectionView extends Backbone.View

  initialize: (options) ->
    { @artworkCollection } = options
    @page = 0
    @columnsView = new ArtworkColumnsView
      el: @$('#user-profile-collection-artworks')
      collection: new Artworks
      artworkSize: 'larger'
      numberOfColumns: 3
      gutterWidth: 80
    @$el.infiniteScroll @nextPage
    @artworkCollection.on 'change:name', @renderName
    @nextPage()

  renderName: =>
    @$('h1').text @artworkCollection.get 'name'

  nextPage: =>
    @page++
    @artworkCollection.artworks.fetch
      data: page: @page
      success: (col, res) =>
        return @endInfiniteScroll() if res.length is 0
        @columnsView.appendArtworks new Artworks(res).models

  endInfiniteScroll: =>
    @$('#user-profile-collection-artworks-spinner').hide()
    @$el.off 'infiniteScroll'

  events:
    'click #user-profile-right-edit': 'openEditModal'

  openEditModal: (e) ->
    new EditCollectionModal width: 500, collection: @artworkCollection
    false

module.exports.init = ->
  new CollectionView
    artworkCollection: new ArtworkCollection(
      _.extend COLLECTION, user_id: PROFILE.owner.id
    )
    el: $('#user-profile-collection')