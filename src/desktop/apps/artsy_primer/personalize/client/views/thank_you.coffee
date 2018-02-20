StepView = require './step.coffee'
template = -> require('../../templates/thank_you.jade') arguments...

module.exports = class CollectView extends StepView

  events:
    'click .artsy-primer-personalize-thank-you-button': 'advance'

  render: ->
    @$el.html template
    this
