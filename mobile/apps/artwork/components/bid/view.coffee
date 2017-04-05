_ = require 'underscore'
Backbone = require 'backbone'
openMultiPage = require '../../../../components/multi_page/index'
ModalView = require '../../../../components/modal/view'
Sale = require '../../../../models/sale'
AuctionClockView = require '../../../../components/auction_clock/view'
Artwork = require '../../../../models/artwork'
SaleArtwork = require '../../../../models/sale_artwork'
updateCurrentBid = require './index'

module.exports = class ArtworkBidView extends Backbone.View

  events:
    "click .js-auction-multipage": "openMultiPage"

  initialize: ({ @artwork }) ->
    return unless @artwork.auction
    sale = new Sale @artwork.auction
    @setupAuctionClock(sale)
    updateCurrentBid()

  openMultiPage: (e) ->
    id = $(e.currentTarget).data 'id'
    pages = openMultiPage id
    pages.collection.invoke 'fetch'
    modal = new ModalView
    modal.render()
    @$el.append modal.$el
    modal.insertModalContent pages.$el

  setupAuctionClock: (sale) ->
    @auctionClockView = new AuctionClockView
      model: sale
      el: @$('.artwork-auction-bid-module__clock')
    @auctionClockView.start()
