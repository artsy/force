_ = require 'underscore'
{ API_URL } = require('sharify').data
Sales = require './sales'
Auction = require '../models/auction'

module.exports = class Auctions extends Sales
  model: Auction

  url: "#{API_URL}/api/v1/sales?is_auction=true"

  previews: ->
    @chain()
    .select (auction) ->
      auction.isAuction() and auction.isPreview()
    .sortBy (auction) ->
      Date.parse auction.get('start_at')
    .value()

  opens: ->
    @chain()
    .select (auction) ->
      auction.isAuction() and auction.isOpen()
    .sortBy (auction) ->
      Date.parse auction.sortableDate()
    .value()

  closeds: ->
    @chain()
    .select (auction) ->
      # Includes auction promos
      (auction.isAuction() or auction.isAuctionPromo()) and auction.isClosed()
    .sortBy (auction) ->
      -(Date.parse auction.sortableDate())
    .value()

  auctions: ->
    @select (auction) ->
      auction.isAuction()

  currentAuctionPromos: ->
    @chain()
    .select (auction) ->
      auction.isAuctionPromo() and not auction.isClosed()
    .sortBy (auction) ->
      -(Date.parse auction.sortableDate())
    .value()

  next: ->
    _.first @previews()
