StepView = require './step.coffee'
template = -> require('../../templates/collect.jade') arguments...
track = require('../../../../lib/analytics.coffee').track

module.exports = class CollectView extends StepView
  events:
    'click a': 'setCollectorLevel'

  setCollectorLevel: (e) ->
    e.preventDefault()
    value = parseInt $(e.target).data 'value'
    @user.set 'collector_level', value
    @state.set 'current_level', value

    track.funnel "Personalize collector level:#{value}", { label: "User:#{@user.id}" }

    @advance()

  render: ->
    @$el.html template(state: @state)
    this
