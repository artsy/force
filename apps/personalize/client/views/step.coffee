Backbone = require 'backbone'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'
device = require '../../../../components/util/device.coffee'

module.exports = class StepView extends Backbone.View
  className: 'personalize-frame'

  initialize: (options) ->
    { @state, @user } = options

  autofocus: ->
    device.autofocus()

  advance: (e) ->
    e?.preventDefault()

    analyticsHooks.trigger 'personalize:advance',
      value: @state.currentStepLabel(),
      label: "User:#{@user.id}"

    @state.trigger 'transition:next'
