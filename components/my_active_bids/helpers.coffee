moment = require 'moment'
{ PREDICTION_URL } = require('sharify').data

module.exports =
  liveAuctionUrl: (saleId) ->
    "#{PREDICTION_URL}/#{saleId}"
