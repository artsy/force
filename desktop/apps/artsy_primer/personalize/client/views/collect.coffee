StepView = require './step'
template = -> require('../../templates/collect.jade') arguments...
analyticsHooks = require '../../../../../lib/analytics_hooks'

module.exports = class CollectView extends StepView
  events:
    'click a': 'setCollectorLevel'

  setCollectorLevel: (e) ->
    e.preventDefault()
    value = parseInt $(e.target).data 'value'
    @user.save collector_level: value
    @state.set 'current_level', value

    analyticsHooks.trigger 'personalize:collector_level', { value: value, label: "User:#{@user.id}" }

    @advance()

  render: ->
    @$el.html template(state: @state)
    this
