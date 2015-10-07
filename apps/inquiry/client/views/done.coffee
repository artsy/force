StepView = require '../../../../components/inquiry_questionnaire/views/step.coffee'

module.exports = class Done extends StepView
  template: ->
    @message

  __events__:
    'click': 'done'

  done: ->
    @state.trigger 'done'

  initialize: ({ @logger, @state }) ->
    choose = @logger.hasLoggedThisSession 'confirmation'
    @message = {
      true: 'Thank you for completing your profile'
      false: 'Your inquiry has been sent'
    }[choose]
