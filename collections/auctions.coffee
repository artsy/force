{ API_URL } = require('sharify').data
Sales = require './sales.coffee'
Auction = require '../models/auction.coffee'

module.exports = class Auctions extends Sales
  model: Auction

  url: "#{API_URL}/api/v1/sales?is_auction=true"
