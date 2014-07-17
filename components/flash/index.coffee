_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'

module.exports = class FlashMessage extends Backbone.View
  container: '#main-layout-flash'
  className: 'fullscreen-flash-message'

  visibleDuration: 2000

  events:
    'click': 'close'

  template: ->
    "<span>#{@message}</span>"

  initialize: (options = {}) ->
    throw new Error('You must pass a message option') unless options.message

    { @message, @autoclose } = _.defaults options, autoclose: true

    mediator.on 'flash:close', @close, this

    @open()

  open: ->
    @setup()

    # Check for existing flash message and only
    # start a timer if there isn't one on screen
    # (and autoclose option is true)
    if @autoclose and @empty()
      @startTimer()

  setup: ->
    if @empty()
      @$el.html @template()
      @$container.html @$el
      _.defer => @$el.attr 'data-state', 'open'

    # If there already is a flash message on screen
    # Take over its el then update the message
    else
      @setElement @$container.children()
      _.defer => @update @message

  startTimer: ->
    @__removeTimer__ = _.delay @close, @visibleDuration

  stopTimer: ->
    clearInterval @__removeTimer__

  empty: ->
    @__empty__ ?= (@$container = $(@container)).is ':empty'

  update: (message) ->
    @message = message
    @$el.html @template()

  close: =>
    mediator.off null, null, this

    @$el.
      attr('data-state', 'closed').
      one($.support.transition.end, =>
        @remove()
        @stopTimer()
      ).emulateTransitionEnd 500
