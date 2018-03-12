Backbone = require 'backbone'
accounting = require 'accounting'
{ Markdown } = require 'artsy-backbone-mixins'
_ = require 'underscore'
sd = require('sharify').data

module.exports = class SaleArtwork extends Backbone.Model

  _.extend @prototype, Markdown

  url: -> "#{sd.API_URL}/api/v1/sale/#{@get('sale').id}/sale_artwork/#{@get('artwork').id}"

  reserveFormat:
    no_reserve: undefined
    reserve_met: 'Reserve met'
    reserve_not_met: 'Reserve not met'

  money: (attr) ->
    accounting.formatMoney(@get(attr) / 100, '$', 0) if @has attr

  currentBid: ->
    @get('display_highest_bid_amount_dollars') || @get('display_opening_bid_dollars')

  minBid: ->
    @get('display_minimum_next_bid_dollars')

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

  estimate: ->
    _.compact([@get('display_low_estimate_dollars'), @get('display_high_estimate_dollars')]).join('–') or
    @get 'display_estimate_dollars'

  estimateLabel: ->
    if @has('estimate_cents') and (not @has('low_estimate_cents') or not @has('high_estimate_cents'))
      'Estimated value'
    else
      'Estimate'

  formatBidsAndReserve: ->
    count = @bidCount()
    label = if count is 0 then '' else @bidCountLabel()
    reserve = @reserveFormat[@get('reserve_status')]
    reserve = "This work has a reserve" if reserve? and not label
    bidAndReserve = _.compact([label, reserve]).join(', ')
    if bidAndReserve then "(#{bidAndReserve})" else ''
