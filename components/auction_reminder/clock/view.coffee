_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'

UNIT_MAP =
  'hours': 'HRS'
  'minutes': 'MIN'
  'seconds': 'SEC'

module.exports = class AuctionClock extends Backbone.View

  initialize: ({ @auctionEndat }) ->

  start: ->
    @render()

  render: =>
    @renderClock()
    @interval = setInterval @renderClock, 1000

  renderClock: =>
    if moment.duration(moment(@auctionEndat).diff(moment()))._milliseconds < 0
      @$el.trigger 'auctionClosed'
      clearInterval(@interval)
    @$('.clock-value').html _.compact((for unit, label of UNIT_MAP
      diff = moment.duration(moment(@auctionEndat)?.diff(moment()))[unit]()
      """
        <li>
          <div class="auction-clock-element">#{if diff < 10 then '0' + diff else diff}</div>
          <div class="auction-clock-element"><small>#{label}</small></div>
        </li>
      """
    )).join '<li>:</li>'