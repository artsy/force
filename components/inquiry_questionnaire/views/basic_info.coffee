StepView = require './step.coffee'
template = -> require('../templates/basic_info.jade') arguments...

module.exports = class BasicInfo extends StepView
  template: template

  events:
    'click button': 'serialize'

  serialize: (e) ->
    e.preventDefault()
    @user.set @serializeForm()
    alert JSON.stringify(@user.attributes)
    # @next()
