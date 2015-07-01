_ = require 'underscore'
Backbone = require 'backbone'
{ isTouchDevice } = require '../../util/device.coffee'

module.exports = class StepView extends Backbone.View
  __events__: null

  events: ->
    _.extend @__events__,
      'click .js-nevermind': 'dismiss'

  initialize: ({ @user, @state, @artwork }) -> #

  template: ->
    throw new Error 'no template provided'

  next: (e) ->
    e?.preventDefault()
    @state.next()

  dismiss: (e) ->
    e.preventDefault()
    @state.trigger 'abort'

  autofocus: ->
    unless isTouchDevice()
      _.defer =>
        @$el.find('input:visible, textarea:visible').first().focus()

  render: ->
    @$el.html @template
      user: @user
      state: @state
      artwork: @artwork
    @postRender()
    @autofocus()
    this

  postRender: -> #
