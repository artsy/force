_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'

UNIT_MAP =
  'months': 'months'
  'days': 'days'
  'hours': 'hrs'
  'minutes': 'min'
  'seconds': 'sec'

module.exports = class ClockView extends Backbone.View

  modelName: 'Auction'

  initialize: ({ @closedText, @modelName }) ->
    @closedText ?= 'Online Bidding Closed'

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
        @$('.clock-header').html "#{@modelName} opens in:"
        @toDate = @model.get 'offsetStartAtMoment'
      when 'open'
        @$('.clock-header').html "#{@modelName} closes in:"
        @toDate = @model.get 'offsetEndAtMoment'
      when 'closed'
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
          <li>
            #{if diff < 10 then '0' + diff else diff}
            <small>#{label}</small>
          </li>
        """
    )).join '<li>:</li>'
