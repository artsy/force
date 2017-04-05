_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator'
safe = _.template "<span><%- message %></span>"
unsafe = _.template "<span><%= message %></span>"

module.exports = class FlashMessage extends Backbone.View
  container: '#main-layout-flash'
  className: 'fullscreen-flash-message'

  defaults:
    safe: true
    autoclose: true
    autoopen: true
    backdrop: true
    visibleDuration: 5000

  events:
    'click': 'close'

  template: ->
    if @safe then (safe arguments...) else (unsafe arguments...)

  initialize: (options = {}) ->
    throw new Error('You must pass a message option') unless options.message

    { @message
      @autoclose
      @autoopen
      @href
      @safe
      @visibleDuration
      @backdrop } = _.defaults options, @defaults

    @listenTo mediator, 'flash:close', @close

    @open() if @autoopen

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
    @$el
      .addClass if not @backdrop then 'is-sans-backdrop' else ''
      .html @template
        message: @message

    this

  maybeRedirect: ->
    location.assign @href if @href

  close: (callback) =>
    @$el
      .attr 'data-state', 'closed'
      .one $.support.transition.end, =>
        @remove()
        @stopTimer()
        @maybeRedirect()
        callback?()
        @trigger 'closed'
      .emulateTransitionEnd 500
