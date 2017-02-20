_ = require 'underscore'
Q = require 'bluebird-q'
moment = require 'moment'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class AuctionReminderView extends Backbone.View
  tagName: 'a'
  className: 'auction-reminder'
  attributes: ->
    href: @model.href()

  events:
    'click': 'click'

  initialize: ({ @dismisser }) -> #

  click: (e) ->
    @dismisser.dismiss()

    if $(e.target).hasClass 'js-dismiss'
      e.preventDefault()
      return @close()

  getOffsetTimesPromise: ->
    Q.promise (resolve, reject, notify) =>
      @model.calculateOffsetTimes
        success: =>
          switch @model.reminderStatus()
            when 'live_open_soon'
              startMoment = @model.get('offsetLiveStartAtMoment')
              # only show minutes if auction doesn't start on the hour
              # & show add 'tomorrow' if auction starts tomorrow
              formatStr = if startMoment.minutes() == 0 then 'hA' else 'h:mmA'
              formattedTime = startMoment.format(formatStr)
              time = if startMoment.isSame(moment(), 'day') then formattedTime else "#{formattedTime} Tomorrow"
              @$el.find('.time-msg').html("Auction begins at #{time}")
            when 'closing_soon'
              endMoment = @model.get('offsetEndAtMoment')
              time = endMoment.fromNow()
              @$el.find('.time-msg').html("Auction ends #{time}")
          resolve(this)


  preRender: ->
    Q.fcall =>
      @$el.html template
        auction: @model
      if @model.reminderStatus() == 'live_open' #bc then we don't need times
        this
      else
        @getOffsetTimesPromise()

  unhide: ->
    @$el.attr 'data-state', 'open'
    this

  close: (callback = $.noop) ->
    @$el
      .attr 'data-state', 'closed'
      .one $.support.transition.end, =>
        @remove()
        @trigger 'closed'
        callback()
      .emulateTransitionEnd 500
