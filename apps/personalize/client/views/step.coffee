Backbone  = require 'backbone'
track     = require('../../../../lib/analytics.coffee').track
device    = require '../../../../components/util/device.coffee'

module.exports = class StepView extends Backbone.View
  className: 'personalize-frame'

  initialize: (options) ->
    { @state, @user } = options

  autofocus: ->
    device.autofocus()

  advance: (e) ->
    e?.preventDefault()
    track.funnel "Finishing Personalize #{@state.currentStepLabel()}", label: "User:#{@user.id}"
    @state.trigger 'transition:next'
