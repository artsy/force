_ = require 'underscore'
ClockView = require '../../../components/clock/view.coffee'

startClock = (sale) ->
  clock = new ClockView
    el: $(".js-auction-clock[data-id='#{sale.id}']")
    model: sale
    modelName: 'Auction'
    closedText: 'Auction Closed' if sale.isAuctionPromo() || sale.isClosed()
  clock.start()

setupClock = (sale) ->
  return unless sale.id?

  if sale.has('start_at') and sale.has('end_at')
    startClock sale
  else
    sale.fetch success: startClock

module.exports = (sales) ->
  _.each sales, setupClock
