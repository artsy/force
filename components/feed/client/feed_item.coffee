_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../models/artwork.coffee'
sd                      = require('sharify').data
ShareView               = require '../../share/view.coffee'
AcquireArtwork          = require('../../acquire/view.coffee').acquireArtwork
analytics               = require('../../../lib/analytics.coffee')
SaveControls            = require '../../artwork_item/views/save_controls.coffee'
artworkColumns          = -> require('../../artwork_columns/template.jade') arguments...
ShareView               = require '../../share/view.coffee'

module.exports.FeedItemView = class FeedItemView extends Backbone.View

  events:
    "click .purchase" : "purchase"
    'click .see-more' : 'fetchMoreArtworks'

  artworksPage: 1
  artworksPageSize: 8

  initialize: (options) ->
    throw 'requires a model' unless @model
    throw 'requires an $el' unless @$el.length > 0
    @artworkCollection = options.artworkCollection
    _.defer =>
      @setupArtworkSaveControls()
      @setupShareButtons()

  moreArtworksClick: (event) =>
    analytics.track.click "Clicked show all artworks on feed item"
    @fetchMoreArtworks $(event.target)

  fetchMoreArtworks: ->
    @$seeMore ?= @$('.see-more')
    @$seeMore.addClass 'is-loading'
    @model.toChildModel().fetchArtworks
      success: (artworks) =>
        @$seeMore.remove()
        @$('.feed-large-artworks-columns').html artworkColumns artworkColumns: artworks.groupByColumnsInOrder(4)
        @setupArtworkSaveControls artworks
    false

  setupArtworkSaveControls: (artworks=@model.artworks().models)->
    listItems =
      for artwork in artworks
        overlay = @$(".artwork-item[data-artwork='#{artwork.get('id')}']").find('.overlay-container')
        if overlay.length
          new SaveControls
            el               : overlay
            model            : artwork
            artworkCollection: @artworkCollection

    if @artworkCollection
      @artworkCollection.addRepoArtworks @model.artworks()
      @artworkCollection.syncSavedArtworks()

  setupShareButtons: ->
    new ShareView el: @$('.feed-item-share-section')

  purchase: (event) =>
    $target = $(event.target)
    id = $target.attr('data-id')
    new Artwork(id: id).fetch
      success: (artwork) =>
        # redirect to artwork page if artwork has multiple editions
        if artwork.get('edition_sets_count') > 1
          return App.router.navigate "/artwork/#{artwork.get('id')}", trigger: true

        AcquireArtwork artwork, $target
    false
