_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../models/artwork'
sd = require('sharify').data
ShareView = require '../../share/view'
AcquireArtwork = require('../../acquire/view').acquireArtwork
SaveControls = require '../../artwork_item/save_controls'
ContactPartnerView = require '../../contact/contact_partner'
artworkColumns = -> require('../../artwork_columns/template.jade') arguments...
Artwork = require('../../../models/artwork')

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

        @$('.feed-large-artworks-columns').html artworkColumns artworkColumns: artworks.groupByColumnsInOrder(4)
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

  acquire: (event) ->
    $target = $(event.target)
    id = $target.attr('data-id')
    new Artwork(id: id).fetch
      success: (artwork) =>
        # redirect to artwork page if artwork has multiple editions
        if artwork.get('edition_sets_count') > 1
          window.location.href = artwork.href()
        AcquireArtwork artwork, $target
    false
