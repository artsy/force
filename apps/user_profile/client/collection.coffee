_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
{ ArtworkCollection } = ArtworkCollections = require '../../../collections/artwork_collections.coffee'
{ COLLECTION, PROFILE } = require('sharify').data
COLUMN_WIDTH = 300

module.exports.CollectionView = class CollectionView extends Backbone.View

  initialize: (options) ->
    { @artworkCollection } = options
    @page = 0
    @columnsView = new ArtworkColumnsView
      el: @$('#user-profile-collection-artworks')
      collection: new Artworks
      artworkSize: 'tall'
      numberOfColumns: Math.round @$el.width() / COLUMN_WIDTH
      gutterWidth: 40
    @$el.infiniteScroll @nextPage
    @nextPage()

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

module.exports.init = ->
  new CollectionView
    artworkCollection: new ArtworkCollection(
      _.extend COLLECTION, user_id: PROFILE.owner.id
    )
    el: $('#user-profile-collection')