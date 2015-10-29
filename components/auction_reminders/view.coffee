_ = require 'underscore'
Backbone = require 'backbone'
ClockView = require '../clock/view.coffee'
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

  postRender: ->
    @clock = new ClockView
      el: @$('.js-auction-reminder-clock')
      model: @model
      modelName: 'Auction'
      stateCallback: =>
        @close()

    @clock.start =>
      @$el.attr 'data-state', 'open'

  render: ->
    @$el.html template
      auction: @model
    @postRender()
    this

  close: (callback = $.noop) ->
    @$el
      .attr 'data-state', 'closed'
      .one $.support.transition.end, =>
        @clock.remove()
        @remove()
        @trigger 'closed'
        callback()
      .emulateTransitionEnd 500
