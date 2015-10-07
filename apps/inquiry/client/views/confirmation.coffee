StepView = require '../../../../components/inquiry_questionnaire/views/step.coffee'

module.exports = class Confirmation extends StepView
  template: ->
    'Your inquiry has been sent'

  __events__:
    'click': 'next'
