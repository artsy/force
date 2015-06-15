StepView = require './step.coffee'
template = -> require('../templates/placeholder.jade') arguments...

module.exports = class Done extends StepView
  template: template

  __events__:
    'click button': 'done'

  done: (e) ->
    e.preventDefault()
    @state.trigger 'done'
