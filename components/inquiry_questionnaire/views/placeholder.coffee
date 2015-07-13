StepView = require './step.coffee'
template = -> require('../templates/placeholder.jade') arguments...

module.exports = class Placeholder extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'next'
