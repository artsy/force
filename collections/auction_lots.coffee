_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
AuctionLot = require '../models/auction_lot.coffee'
PageableCollection = require 'backbone-pageable'

module.exports = class AuctionLots extends PageableCollection
  model: AuctionLot

  sortCriteria:
    '-auction_date': 'Most Recent'
    '-high_estimate_dollar,-auction_date': 'Estimate'
    '-price_realized_dollar,-auction_date': 'Sale Price'

  url: ->
    "#{sd.API_URL}/api/v1/artist/#{@id}/auction_lots?page=#{@state.currentPage}&size=#{@state.pageSize}&sort=#{@sortBy}&total_count=1"

  initialize: (models, options = {}) ->
    { @id, @sortBy } = _.defaults(options, sortBy: '-price_realized_dollar,-auction_date')
    super

  parseState: (resp, queryParams, state, options) ->
    if options.res
      totalRecords: parseInt options.res.headers['x-total-count']

  resultsWithImages: ->
    @filter (auctionLot) ->
      auctionLot.hasImage()
