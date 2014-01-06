Backbone = require 'backbone'

module.exports = class StepView extends Backbone.View
  className: 'personalize-frame'

  initialize: (options) ->
    { @state, @user } = options

  advance: (e) ->
    e?.preventDefault()
    @state.trigger 'transition:next'
