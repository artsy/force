moment = require 'moment'
clock = require '../clock/index.coffee'

module.exports =
  countdownLabel: (startAt) ->
    if moment(startAt).isAfter()
      'Auction closes in'
    else
      'Auction opens in'

  countdownClock: (startAt, endAt) ->
    if moment(startAt).isAfter()
      clock startAt
    else
      clock endAt
