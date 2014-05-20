_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../models/artwork.coffee'
sd                      = require('sharify').data
ShareView               = require '../../share/view.coffee'
AcquireArtwork          = require('../../acquire/view.coffee').acquireArtwork
analytics               = require('../../../lib/analytics.coffee')
SaveControls            = require '../../artwork_item/save_controls.coffee'
ContactPartnerView      = require '../../contact/contact_partner.coffee'
artworkColumns          = -> require('../../artwork_columns/template.jade') arguments...
Artwork                 = require('../../../models/artwork.coffee')
trackArtworkImpressions = require("../../analytics/impression_tracking.coffee").trackArtworkImpressions

module.exports.FeedItemView = class FeedItemView extends Backbone.View

  events:
    'click .see-more'                    : 'fetchMoreArtworks'
    "click .artwork-item-buy"            : "acquire"
    "click .artwork-item-contact-seller" : "contactSeller"

  artworksPage: 1
  artworksPageSize: 8

  initialize: (options) ->
    throw 'requires a model' unless @model
    throw 'requires an $el' unless @$el.length > 0
    @artworkCollection = options.artworkCollection
    _.defer =>
      @setupArtworkSaveControls()
      @setupShareButtons()
      @setupArtworkImpressionTracking()

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

  setupArtworkImpressionTracking: (artworks=@model.artworks().models) ->
    trackArtworkImpressions artworks, @$el

  setupArtworkSaveControls: (artworks=@model.artworks().models) ->
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
    el = if @$('.feed-item-share-section').length > 0 then @$('.feed-item-share-section') else @$('.post-actions .post-share-actions')
    new ShareView
      el: el

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

  contactSeller: (event) ->
    event.preventDefault()
    $target = $(event.target)
    id = $target.attr('data-id')
    new Artwork(id: id).fetch
      success: (artwork) =>
          new ContactPartnerView
            artwork: artwork
            partner: artwork.get('partner')
    false
