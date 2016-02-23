{ BANNER } = require('sharify').data
ClockView = require '../clock/view.coffee'

module.exports = ->
  if { end_at } = BANNER
    clockView = new ClockView label: 'Auction closes in', timestamp: end_at
    clockView.start()

    $('.js-artwork-banner__countdown')
      .html clockView.render().$el
