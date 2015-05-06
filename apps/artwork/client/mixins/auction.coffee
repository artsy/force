_ = require 'underscore'
sd = require('sharify').data
Auction = require '../../../../models/auction.coffee'
ClockView = require '../../../../components/clock/view.coffee'
BidderPositions = require '../../../../collections/bidder_positions.coffee'
SaleArtwork = require '../../../../models/sale_artwork.coffee'
AuctionDetailView = require '../../components/auction_detail/view.coffee'

module.exports =
  setupAuction: (sale) ->
    @auction = new Auction @sale.toJSON(), parse: true

    @setupAuctionDetailView()

    return if @artwork.get 'sold'

    # This hides the normal availablity status UI
    # which we just wind up using if the artwork is already sold
    # (via 'Buy Now')
    @$('.artwork-detail')
      .addClass if @auction.isAuctionPromo() then 'is-auction-promo' else 'is-auction'

  setupClock: ->
    @clock = new ClockView
      modelName: 'Auction'
      model: @auction
      el: @$clock = @$('#artwork-clock')
    @$clock.addClass 'is-fade-in'
    @clock.start()

  setupSaleArtwork: ->
    @saleArtwork = new SaleArtwork
      id: @artwork.id
      artwork: @artwork
      sale: @auction
    @saleArtwork.fetch()

  setupAuctionDetailView: ->
    $.when.apply(null, _.compact([
      @setupClock()
      @setupAuctionUser()
      @setupSaleArtwork()
      @setupBidderPositions()
    ])).then =>
      # Set up everything but the auction detail view
      # if the artwork is already sold (via 'Buy Now')
      unless @artwork.get 'sold'
        @auctionDetailView = new AuctionDetailView(
          el: @$('#auction-detail')
          artwork: @artwork
          user: @currentUser
          bidderPositions: @bidderPositions
          saleArtwork: @saleArtwork
          auction: @auction
        ).render()

  setupBidderPositions: ->
    return unless @currentUser
    @bidderPositions = new BidderPositions null,
      saleArtwork: @saleArtwork
      sale: @auction
    @bidderPositions.fetch()

  setupAuctionUser: ->
    return unless @currentUser
    @currentUser.checkRegisteredForAuction
      success: (isRegistered) =>
        @currentUser.set 'registered_to_bid', isRegistered
