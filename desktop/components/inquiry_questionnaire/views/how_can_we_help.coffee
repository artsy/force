StepView = require './step'
template = -> require('../templates/how_can_we_help.jade') arguments...

module.exports = class HowCanWeHelp extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'next'
    'click .js-choice': 'choose'

  choose: (e) ->
    e.preventDefault()
    choice = $(e.currentTarget).data 'value'
    @state.set 'value', choice
    @next()
