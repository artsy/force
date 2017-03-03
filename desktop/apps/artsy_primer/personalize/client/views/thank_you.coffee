StepView = require './step.coffee'
template = -> require('../../templates/thank_you.jade') arguments...

module.exports = class CollectView extends StepView

  render: ->
    @$el.html template
    this
