StepView = require './step.coffee'
template = -> require('../templates/institutional_affliation.jade') arguments...

module.exports = class InstitutionalAffliation extends StepView
  template: template

  __events__:
    'click button': 'next'
