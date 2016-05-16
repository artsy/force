moment = require 'moment'
clock = require '../clock/index.coffee'

module.exports =
  countdownLabel: (startAt) ->
    if moment(startAt).isBefore()
      'Bidding closes in'
    else
      'Bidding opens in'

  countdownTimestamp: countdownTimestamp = (startAt, endAt) ->
    if moment(startAt).isBefore()
      endAt
    else
      startAt

  countdownClock: (startAt, endAt) ->
    clock countdownTimestamp arguments...
