_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
SaveControls = require '../../artwork_item/save_controls'
artworkColumns = -> require('../../artwork_columns/template.jade') arguments...

module.exports.FeedItemView = class FeedItemView extends Backbone.View

  events:
    'click .see-more': 'fetchMoreArtworks'
    "click .artwork-item-buy": "acquire"

  artworksPage: 1
  artworksPageSize: 8

  initialize: ({@additionalParams, @artworkCollection, @context_page, @context_module}) ->
    throw 'requires a model' unless @model
    throw 'requires an $el' unless @$el.length > 0
    @hideArtworks()
    _.defer =>
      @setupArtworkSaveControls()

  hideArtworks: ->
    _.each(@model.artworks().rest(@model.get('initialArtworkSize')), ((artwork) =>
      @$el.find("figure[data-artwork='#{artwork.get('id')}']").hide()))

  showArtworks: ->
    @$el.find(".artwork-item:not(:visible)").fadeIn('fast')
    @$el.find(".feed-item-see-more").hide()

  fetchMoreArtworks: ->
    @$seeMore ?= @$('.see-more')
    @$seeMore.addClass 'is-loading'
    @artworksPage++
    @model.toChildModel().related().artworks.fetch
      data:
        size: @artworksPageSize * @artworksPage
      success: (artworks, response, options) =>
        artworksLeft = @model.get('eligible_artworks_count') - artworks.length

        if artworksLeft
          @$seeMore.html "See #{artworksLeft} more artworks"
          @$seeMore.removeClass 'is-loading'
        else
          @$seeMore.remove()

        @$('.feed-large-artworks-columns').html artworkColumns
          sd: sd
          artworkColumns: artworks.groupByColumnsInOrder(4)

        @setupArtworkSaveControls artworks.models
    false

  setupArtworkSaveControls: (artworks=@model.artworks().models) ->
    listItems =
      for artwork in artworks
        overlay = @$(".artwork-item[data-artwork='#{artwork.get('id')}']").find('.overlay-container')
        if overlay.length
          new SaveControls
            el: overlay
            model: artwork
            artworkCollection: @artworkCollection
            context_page: @context_page
            context_module: @context_module

    if @artworkCollection
      @artworkCollection.addRepoArtworks @model.artworks()
      @artworkCollection.syncSavedArtworks()

