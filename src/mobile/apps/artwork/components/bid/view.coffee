_ = require 'underscore'
Backbone = require 'backbone'
openMultiPage = require '../../../../components/multi_page/index.coffee'
ModalView = require '../../../../components/modal/view.coffee'
Sale = require '../../../../models/sale.coffee'
ClockView = require '../../../../../desktop/apps/artwork/components/clock/view.coffee'
Artwork = require '../../../../models/artwork.coffee'
SaleArtwork = require '../../../../models/sale_artwork.coffee'
updateCurrentBid = require './index.coffee'
{ ARTWORK } = require('sharify').data
{ countdownLabel, countdownTimestamp } = require '../../../../../desktop/apps/artwork/components/banner/helpers.coffee'

module.exports = class ArtworkBidView extends Backbone.View

  events:
    "click .js-auction-multipage": "openMultiPage"

  initialize: ({ @artwork }) ->
    return unless @artwork.auction
    sale = new Sale @artwork.auction
    @setupDesktopAuctionClock(sale)
    updateCurrentBid()

  openMultiPage: (e) ->
    id = $(e.currentTarget).data 'id'
    pages = openMultiPage id
    pages.collection.invoke 'fetch'
    modal = new ModalView
    modal.render()
    @$el.append modal.$el
    modal.insertModalContent pages.$el

  setupDesktopAuctionClock: (sale) ->
    if { start_at, end_at, live_start_at } = ARTWORK.auction
      clockView = new ClockView
        label: countdownLabel start_at, live_start_at
        timestamp: countdownTimestamp start_at, end_at, live_start_at
      clockView.start()
    $('.artwork-auction-bid-module__clock')
      .html clockView.render().$el
