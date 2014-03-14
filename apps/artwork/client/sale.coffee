_               = require 'underscore'
Backbone        = require 'backbone'
{ ARTSY_URL }   = require('sharify').data

Artworks            = require '../../../collections/artworks.coffee'
ArtworkColumnsView  = require '../../../components/artwork_columns/view.coffee'
SaleArtworkView     = require '../../../components/artwork_item/views/sale_artwork.coffee'
trackArtworkImpressions = require("../../../components/analytics/impression_tracking.coffee").trackArtworkImpressions

template                = -> require('../templates/sale.jade') arguments...
artworkColumnsTemplate  = -> require('../../../components/artwork_columns/template.jade') arguments...


module.exports = class SaleView extends Backbone.View
  initialize: (options) ->
    { @saved, @sale } = options

    @saleArtworks      = new Backbone.Collection
    @saleArtworks.url  = "#{ARTSY_URL}/api/v1/sale/#{@sale.id}/sale_artworks"
    @saleArtworks.fetch
      success: =>
        @artworks = Artworks.fromSale @saleArtworks
        @render()
        @setupSaleArtworkViews()
        @setupArtworkImpressionTracking @artworks.models
      error: =>
        @remove()

  setupArtworkImpressionTracking: (artworks) ->
    trackArtworkImpressions artworks, @$el

  setupSaleArtworkViews: ->
    @saleArtworkViews = @artworks.map (artwork) =>
      new SaleArtworkView
        artworkCollection: @saved
        el: @$(".artwork-item[data-artwork='#{artwork.id}']")
        model: artwork

  render: ->
    @$el.html template(sale: @sale)
    @$('#sale-artwork-columns').html artworkColumnsTemplate
      artworkColumns: @artworks.groupByColumnsInOrder()
      setHeight: 400
      displayPurchase: true
