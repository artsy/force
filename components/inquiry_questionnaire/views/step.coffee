_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class StepView extends Backbone.View
  __events__: null

  events: ->
    _.extend @__events__,
      'click .js-nevermind': 'dismiss'

  initialize: ({ @modal, @user, @state, @artwork }) -> #

  template: ->
    throw new Error 'no template provided'

  next: (e) ->
    e?.preventDefault()
    @state.next()

  dismiss: (e) ->
    e.preventDefault()
    @modal.close()

  render: ->
    @$el.html @template
      user: @user
      state: @state
      artwork: @artwork
    @postRender()
    this

  postRender: -> #
