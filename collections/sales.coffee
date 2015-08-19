_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Sale = require '../models/sale.coffee'

module.exports = class Sales extends Backbone.Collection
  model: Sale

  url: "#{API_URL}/api/v1/sales"

  hasAuctions: ->
    _.any @pluck('is_auction')

  firstAuction: ->
    @find (sale) -> sale.isAuction()

  firstAuctionPromo: ->
    @find (sale) -> sale.isAuctionPromo()
