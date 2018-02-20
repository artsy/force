_ = require 'underscore'
StepView = require '../../../../components/inquiry_questionnaire/views/step.coffee'

module.exports = class Done extends StepView
  className: 'iqm-alert'

  template: ->
    @message

  __events__:
    'click': 'done'

  done: ->
    clearInterval @__interval__
    @state.trigger 'done'

  initialize: ({ @logger, @state }) ->
    choose = @logger.hasLoggedThisSession 'confirmation'
    @message = {
      true: 'Thank you for completing your profile'
      false: 'Your inquiry has been sent'
    }[choose]

    @__interval__ = _.delay =>
      @done()
    , 2000
