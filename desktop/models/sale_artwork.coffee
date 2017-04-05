_ = require 'underscore'
{ formatMoney } = require 'accounting'
sd = require('sharify').data
Backbone = require 'backbone'
{ Markdown } = require 'artsy-backbone-mixins'
Artwork = require './artwork'
Sale = require './sale'

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

  money: (attr) ->
    formatMoney(@get(attr) / 100, '$', 0) if @has attr

  currentBid: ->
    @get('display_highest_bid_amount_dollars') || @get('display_opening_bid_dollars')

  minBid: ->
    @get('display_minimum_next_bid_dollars')

  estimate: ->
    _.compact([@get('display_low_estimate_dollars'), @get('display_high_estimate_dollars')]).join('–') or
    @get 'display_estimate_dollars'

  estimateLabel: ->
    if @has('estimate_cents') and (not @has('low_estimate_cents') or not @has('high_estimate_cents'))
      'Estimated value'
    else
      'Estimate'

  # Changes bidAmount to a number in cents
  cleanBidAmount: (bidAmount)->
    if bidAmount
      bidAmount = String(bidAmount).split('.')[0]
      Number(bidAmount.replace(',', '').replace('.00', '').replace('.', '').replace('$', '')) * 100

  bidLabel: ->
    if @get('highest_bid_amount_cents') then 'Current Bid' else 'Starting Bid'

  bidCount: ->
    count = @get('bidder_positions_count') or 0
    count = 0 unless @get('highest_bid_amount_cents')
    count

  bidCountLabel: ->
    count = @bidCount()
    bids = "#{count} bid"
    bids += if count is 1 then '' else 's'

  formatBidCount: ->
    if @bidCount() is 0 then '' else "(#{@bidCountLabel()})"

  reserveLabel: ->
    @reserveFormat[@get 'reserve_status']

  formatBidsAndReserve: ->
    bid = if @bidCount() is 0 then '' else @bidCountLabel()
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
