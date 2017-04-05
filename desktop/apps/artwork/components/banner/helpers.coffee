moment = require 'moment'
clock = require '../clock/index'

module.exports =
  showCountdown: (startAt, liveStartAt) ->
    return false if liveStartAt and moment(liveStartAt).isBefore()
    true

  countdownLabel: (startAt, liveStartAt) ->
    if liveStartAt and moment(startAt).isBefore()
      'Live bidding opening in'
    else if moment(startAt).isBefore()
      'Auction closes in'
    else
      'Auction opens in'

  countdownTimestamp: countdownTimestamp = (startAt, endAt, liveStartAt) ->
    if liveStartAt and moment(startAt).isBefore()
      liveStartAt
    else if moment(startAt).isBefore()
      endAt
    else
      startAt

  countdownClock: (startAt, endAt) ->
    clock countdownTimestamp arguments...
