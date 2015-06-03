StepView = require './step.coffee'
template = -> require('../templates/art_fairs.jade') arguments...

module.exports = class ArtFairs extends StepView
  template: template

  __events__:
    'click button': 'next'
