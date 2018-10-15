_ = require 'underscore'
StepView = require '../../../../components/inquiry_questionnaire/views/step.coffee'

module.exports = class Confirmation extends StepView
  className: 'iqm-alert'

  template: ->
    'Your Message Has Been Sent'

  __events__:
    'click': 'next'

  next: ->
    clearInterval @__interval__
    @state.next()

  initialize: ({ @logger, @state }) ->
    @__interval__ = _.delay =>
      @next()
    , 2000
