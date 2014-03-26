Auction           = require '../../../../models/sale.coffee'
AuctionClockView  = require '../../../../components/auction_clock/view.coffee'

module.exports =
  setupAuction: (model) ->
    @auction  = new Auction model.toJSON()
    @clock    = new AuctionClockView
      modelName : 'Auction'
      model     : @auction
      el        : @$auctionClock = @$('#artwork-auction-clock')
    @clock.start()
    @$auctionClock.addClass 'is-fade-in'
