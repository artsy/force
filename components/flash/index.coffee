_         = require 'underscore'
Backbone  = require 'backbone'

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

    { @message } = options

    @open()

  open: ->
    @setup()
    @startRemoveTimer()

  setup: ->
    @$el.html @template()
    $(@container).html @$el

    _.defer =>
      @$el.attr 'data-state', 'open'

  startRemoveTimer: ->
    @__removeTimer__ = _.delay @close, @visibleDuration

  close: =>
    @$el.
      attr('data-state', 'closed').
      one($.support.transition.end, =>
        @remove()

        clearInterval @__removeTimer__
      ).emulateTransitionEnd 500
