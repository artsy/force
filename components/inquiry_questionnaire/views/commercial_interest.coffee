StepView = require './step.coffee'
template = -> require('../templates/commercial_interest.jade') arguments...

module.exports = class CommercialInterest extends StepView
  template: template

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    e.preventDefault()
    { name, value } = e.currentTarget
    @user.set name, value
    @next()
