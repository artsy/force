{ BANNER } = require('sharify').data
ClockView = require '../clock/view.coffee'
{ countdownLabel, countdownTimestamp } = require './helpers.coffee'

module.exports = ->
  if { start_at, end_at, live_start_at } = BANNER
    clockView = new ClockView
      label: countdownLabel start_at, live_start_at
      timestamp: countdownTimestamp start_at, end_at, live_start_at
    clockView.start()

    $('.js-artwork-banner__countdown')
      .html clockView.render().$el
