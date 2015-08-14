_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
safe = _.template "<span><%- message %></span>"
unsafe = _.template "<span><%= message %></span>"

module.exports = class FlashMessage extends Backbone.View
  container: '#main-layout-flash'
  className: 'fullscreen-flash-message'

  defaults:
    safe: true
    visibleDuration: 2000
    autoclose: true

  events:
    'click': 'close'

  template: ->
    if @safe then (safe arguments...) else (unsafe arguments...)

  initialize: (options = {}) ->
    throw new Error('You must pass a message option') unless options.message

    { @message
      @autoclose
      @href
      @safe
      @visibleDuration } = _.defaults options, @defaults

    @listenTo mediator, 'flash:close', @close

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
      @$container.html @render().$el
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
    @render()

  render: ->
    @$el.html @template(message: @message)
    this

  maybeRedirect: ->
    location.assign @href if @href

  close: (callback) =>
    @$el.
      attr('data-state', 'closed').
      one($.support.transition.end, =>
        @remove()
        @stopTimer()
        @maybeRedirect()
        callback?()
      ).emulateTransitionEnd 500
