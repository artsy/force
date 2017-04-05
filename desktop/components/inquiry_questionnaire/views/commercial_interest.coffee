StepView = require './step'
template = -> require('../templates/commercial_interest.jade') arguments...

module.exports = class CommercialInterest extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'serialize'

  serialize: (e) ->
    e.preventDefault()

    { name, value } = e.currentTarget

    ($target = $(e.currentTarget))
      .attr 'data-state', 'loading'

    attributes = {}
    attributes[name] = value

    @user.related().collectorProfile.save(attributes)
      .always => @next()
      .done()
