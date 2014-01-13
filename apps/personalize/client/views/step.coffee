Backbone  = require 'backbone'
track     = require('../../../../lib/analytics.coffee').track

module.exports = class StepView extends Backbone.View
  className: 'personalize-frame'

  initialize: (options) ->
    { @state, @user } = options

  advance: (e) ->
    track.funnel "Finishing #{@state.get('current_step')}", { label: "User:#{@user.id}" }

    e?.preventDefault()
    @state.trigger 'transition:next'
