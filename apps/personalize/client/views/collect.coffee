StepView  = require './step.coffee'
template  = -> require('../../templates/collect.jade') arguments...

module.exports = class CollectView extends StepView
  events:
    'click a': 'setCollectorLevel'

  setCollectorLevel: (e) ->
    e.preventDefault()
    value = parseInt $(e.target).data 'value'
    @user.set 'collector_level', value
    @state.setLevel value
    @advance()

  render: ->
    @$el.html template(state: @state)
    this
