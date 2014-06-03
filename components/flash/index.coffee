_         = require 'underscore'
Backbone  = require 'backbone'
mediator  = require '../../lib/mediator.coffee'

module.exports = class FlashMessage extends Backbone.View
  container: '#main-layout-flash'
  className: 'fullscreen-flash-message'

  visibleDuration: 2000

  events:
    'click' : 'close'

  template: ->
    "<span>#{@message}</span>"

  initialize: (options = {}) ->
    throw new Error('You must pass a message option') unless options.message

    { @message, @autoclose } = _.defaults options, autoclose: true

    mediator.on 'flash:close', @close, this

    @open()

  open: ->
    @setup()
    @startRemoveTimer() if @autoclose

  setup: ->
    if (@$container = $(@container)).is ':empty'
      @$el.html @template()
      @$container.html @$el
      _.defer => @$el.attr 'data-state', 'open'

    # If there already is a flash message on screen
    # Take over its el then update the message
    else
      @setElement(@$container.children())
      _.defer => @update @message

  startRemoveTimer: ->
    @__removeTimer__ = _.delay @close, @visibleDuration

  update: (message) ->
    @message = message
    @$el.html @template()

  close: =>
    mediator.off null, null, this

    @$el.
      attr('data-state', 'closed').
      one($.support.transition.end, =>
        @remove()

        clearInterval @__removeTimer__
      ).emulateTransitionEnd 500
