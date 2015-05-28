_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
Form = require '../../mixins/form.coffee'

module.exports = class StepView extends Backbone.View
  _.extend @prototype, Form

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

  render: ->
    @$el.html @template
      user: @user
      state: @state
      artwork: @artwork
    @postRender()
    this

  dismiss: (e) ->
    e.preventDefault()
    mediator.trigger 'modal:close'

  postRender: -> #
