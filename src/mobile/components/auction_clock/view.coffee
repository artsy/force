_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
mediator = require '../../lib/mediator.coffee'

UNIT_MAP =
  'months': 'months'
  'days': 'days'
  'hours': 'hrs'
  'minutes': 'min'
  'seconds': 'sec'

module.exports = class AuctionClockView extends Backbone.View
  almostOver: 60
  initialize: ->
    @listenTo @model, 'change:clockState', @render

  start: ->
    @model.calculateOffsetTimes
      success: =>
        @model.on('change:clockState', ->
          clearInterval @interval
          window.location.reload()
        )
        @render()

  render: =>
    switch @model.get('clockState')
      when 'preview'
        string = if @model.isAuctionPromo() then 'Auction Opens In' else 'Bidding Opens In'
        @$('h2').html string
        @toDate = @model.get 'offsetStartAtMoment'
      when 'open'
        string = if @model.isAuctionPromo() then 'Auction Closes In' else 'Bidding Closes In'
        @$('h2').html string
        @toDate = @model.get 'offsetEndAtMoment'
      when 'live'
        @$('h2').html 'Live Bidding Opening In'
        @toDate = @model.get 'offsetLiveStartAtMoment'
      when 'closed'
        mediator.trigger 'clock:is-over'
        string = if @model.isAuctionPromo() then 'Auction Closed' else 'Online Bidding Closed'
        @$('.auction-clock').replaceWith "<h2 class='auction-clock-closed'>#{string}</h2>"
        return

    @renderClock()
    @interval ?= setInterval @renderClock, 1000

  renderClock: =>
    @model.updateState()
    @$('.auction-clock-value').html _.compact((for unit, label of UNIT_MAP
      diff = moment.duration(@toDate?.diff(moment()))[unit]()

      # Don't display '00' if we have 0 months
      unless diff < 1 and unit in ['months']
        """
          <li>
            #{if diff < 10 then '0' + diff else diff}
          </li>
        """
    )).join '<li>:</li>'

    # emit event every render when timer is almost over
    if @toDate?.diff(moment(), 'seconds') < @almostOver
      mediator.trigger 'clock:is-almost-over'
