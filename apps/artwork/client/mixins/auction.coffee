_                   = require 'underscore'
Auction             = require '../../../../models/sale.coffee'
AuctionClockView    = require '../../../../components/auction_clock/view.coffee'
BidderPositions     = require '../../../../collections/bidder_positions.coffee'
SaleArtwork         = require '../../../../models/sale_artwork.coffee'
AuctionDetailView   = require '../auction_detail.coffee'

module.exports =
  setupAuction: (model) ->
    @auction = new Auction model.toJSON()

    @$('.artwork-detail').addClass 'is-auction'

    @setupAuctionDetailView()

  setupAuctionClock: ->
    @clock = new AuctionClockView
      modelName : 'Auction'
      model     : @auction
      el        : @$auctionClock = @$('#artwork-auction-clock')
    @$auctionClock.addClass 'is-fade-in'
    @clock.start()

  setupSaleArtwork: ->
    @saleArtwork = new SaleArtwork
      id      : @artwork.id
      artwork : @artwork
      sale    : @auction
    @saleArtwork.fetch()

  setupAuctionDetailView: ->
    $.when.apply(null, _.compact([
      @setupAuctionClock()
      @setupAuctionUser()
      @setupSaleArtwork()
      @setupBidderPositions()
    ])).then =>
      @auctionDetailView = new AuctionDetailView(
        user            : @currentUser
        bidderPositions : @bidderPositions
        saleArtwork     : @saleArtwork
        auction         : @auction
        el              : @$('#auction-detail')
      ).render()

  setupBidderPositions: ->
    return unless @currentUser
    @bidderPositions = new BidderPositions null,
      saleArtwork : @saleArtwork
      sale        : @auction
    @bidderPositions.fetch()

  setupAuctionUser: ->
    return unless @currentUser
    @currentUser.checkRegisteredForAuction
      success: (isRegistered) =>
        @currentUser.set 'registered_to_bid', isRegistered
