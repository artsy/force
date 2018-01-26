$ = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
mediator = require '../../lib/mediator.coffee'

UNIT_MAP =
  'months': 'mos'
  'days': 'days'
  'hours': 'hrs'
  'minutes': 'min'
  'seconds': 'sec'

module.exports = class ClockView extends Backbone.View
  almostOver: 60
  modelName: 'Auction'

  initialize: ({ @closedText, @modelName, @stateCallback}) ->
    @closedText ?= 'Auction Closed'
    @stateCallback = @stateCallback or (-> location.reload())

  start: (callback = $.noop) ->
    @model.calculateOffsetTimes
      success: =>
        @model.on('change:clockState', =>
          clearInterval @interval
          @stateCallback()
        )
        @render()
        callback()

  render: =>
    switch @model.get('clockState')
      when 'live'
        @$('.clock-header').html "Live bidding opening in:"
        @toDate = @model.get 'offsetLiveStartAtMoment'
      when 'live-open'
        mediator.trigger 'clock:is-over'
        @$el.html "<div class='clock-header clock-closed'>Live Bidding Now Open</div>"
        return
      when 'preview'
        @$('.clock-header').html "Opening in"
        @toDate = @model.get 'offsetStartAtMoment'
      when 'open'
        @$('.clock-header').html "#{@modelName} closes in:"
        @toDate = @model.get 'offsetEndAtMoment'
      when 'closed'
        mediator.trigger 'clock:is-over'
        @$el.html "<div class='clock-header clock-closed'>#{@closedText}</div>"
        return

    @renderClock()
    @interval = setInterval @renderClock, 1000

  renderClock: =>
    @model.updateState()
    @$('.clock-value').html _.compact((for unit, label of UNIT_MAP
      diff = moment.duration(@toDate?.diff(moment()))[unit]()

      # Don't display '00' if we have 0 months
      if diff < 1 and unit in ['months']
        false
      else
        """
          <li class='clock-#{unit}'>
            #{if diff < 10 then '0' + diff else diff}
            <small>#{label}</small>
          </li>
        """
    )).join '<li>:</li>'

    # emit event every render when timer is almost over
    if @toDate?.diff(moment(), 'seconds') < @almostOver
      mediator.trigger 'clock:is-almost-over'

  remove: ->
    clearInterval @interval
    super
