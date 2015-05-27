_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../../mixins/form.coffee'

module.exports = class StepView extends Backbone.View
  _.extend @prototype, Form

  initialize: ({ @user, @state }) -> #

  template: ->
    throw new Error 'no template provided'

  next: (e) ->
    e?.preventDefault()
    @state.next()

  render: ->
    @$el.html @template
      user: @user
      state: @state
    this
