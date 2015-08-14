_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Artworks = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
SaleArtworkView = require '../../../components/artwork_item/views/sale_artwork.coffee'
trackArtworkImpressions = require("../../../components/analytics/impression_tracking.coffee").trackArtworkImpressions
SaveControls = require '../../../components/artwork_item/save_controls.coffee'
template = -> require('../templates/sale.jade') arguments...
artworkColumnsTemplate = -> require('../../../components/artwork_columns/template.jade') arguments...

module.exports = class SaleView extends Backbone.View
  initialize: (options) ->
    { @artwork, @currentUser, @saved, @sale } = options

    @sale.related().saleArtworks.fetchUntilEndInParallel
      success: (collection, response, options) =>
        collection.remove @artwork
        @artworks = Artworks.fromSale collection
        @render()
        @setupSaleArtworkViews()
        @setupArtworkImpressionTracking @artworks.models
      error: =>
        @remove()

  setupArtworkImpressionTracking: (artworks) ->
    trackArtworkImpressions artworks, @$el

  setupSaleArtworkViews: ->
    @saleArtworkViews = @artworks.map (artwork) =>
      $artwork = @$(".artwork-item[data-artwork='#{artwork.id}']")
      new SaleArtworkView
        el: $artwork
        model: artwork
        sale: @sale
        currentUser: @currentUser
      new SaveControls
        artworkCollection: @saved
        el: $artwork.find('.overlay-container')
        model: @artwork

  render: ->
    @$el.html template(sale: @sale)
    @$('#sale-artwork-columns').html artworkColumnsTemplate
      artworkColumns: @artworks.groupByColumnsInOrder()
      setHeight: 400
      displayPurchase: true
      isAuction: @sale.isAuction()
