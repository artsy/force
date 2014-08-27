_ = require 'underscore'
{ formatMoney } = require 'accounting'
sd = require('sharify').data
Backbone = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'
Artwork = require './artwork.coffee'
Sale = require './sale.coffee'

MAX_POLL_TIMES = 7
POLL_DELAY = 1000

module.exports = class SaleArtwork extends Backbone.Model
  _.extend @prototype, Markdown

  url: ->
    "#{sd.API_URL}/api/v1/sale/#{@get('sale').id}/sale_artwork/#{@get('artwork').id}"

  reserveFormat:
    no_reserve: null
    reserve_met: 'Reserve met'
    reserve_not_met: 'Reserve not met'

  artwork: -> new Artwork(@get('artwork'))
  sale: -> new Sale(@get('sale'))

  currentBid: ->
    formatMoney(
      (@get('highest_bid_amount_cents') or @get('opening_bid_cents')) / 100, '$', 0
    )

  minBid: ->
    formatMoney @get('minimum_next_bid_cents') / 100, '$', 0

  estimate: ->
    if @has('low_estimate_cents') or @has('high_estimate_cents')
      high = formatMoney(@get('high_estimate_cents') / 100, '$', 0) if @has 'high_estimate_cents'
      low = formatMoney(@get('low_estimate_cents') / 100, '$', 0)  if @has 'low_estimate_cents'
      "Estimate: #{_.compact([high, low]).join '–'}"

  # Changes bidAmount to a number in cents
  cleanBidAmount: (bidAmount)->
    if bidAmount
      bidAmount = String(bidAmount).split('.')[0]
      Number(bidAmount.replace(',', '').replace('.00', '').replace('.', '').replace('$', '')) * 100

  bidLabel: ->
    if @get('highest_bid_amount_cents') then 'Current Bid' else 'Starting Bid'

  bidCount: ->
    n = @get('bidder_positions_count') or 0
    count = "#{n} bid"
    count += if n is 1 then '' else 's'
    count

  reserveLabel: ->
    @reserveFormat[@get 'reserve_status']

  formatBidsAndReserve: ->
    bid = if (@get('bidder_positions_count') is 0) then '' else @bidCount()
    reserve = @reserveLabel() unless @get('reserve_status') is 'no_reserve'
    reserve = "This work has a reserve" if reserve? and not bid
    bidAndReserve = _.compact([bid, reserve]).join(', ')
    if bidAndReserve then "(#{bidAndReserve})" else ''

  # Polls the sale artwork API until it notices the bid has changed.
  #
  # @param {Object} options Provide `success` and `error` callbacks similar to Backbone's fetch
  pollForBidChange: (options) ->
    i = 0; lastBid = @get('highest_bid_amount_cents')
    poll = =>
      @fetch
        success: =>
          if @get('highest_bid_amount_cents') isnt lastBid or i > MAX_POLL_TIMES
            clearInterval interval
            options.success()
          else
            i++
        error: =>
          clearInterval interval
          options.error arguments...
    interval = setInterval poll, POLL_DELAY
