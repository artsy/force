StepView = require './step.coffee'
{ setAnalyticsClientReferrerOptions } = require "../../../../lib/analytics/setAnalyticsClientReferrerOptions"
template = -> require('../templates/how_can_we_help.jade') arguments...

module.exports = class HowCanWeHelp extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'next'
    'click .js-choice': 'choose'

  choose: (e) ->
    e.preventDefault()
    choice = $(e.currentTarget).value
    @state.set 'value', choice
    options = setAnalyticsClientReferrerOptions()
    window.analytics.track(
      "inquiry_questionnaire: Clicked on how_can_we_help option",
      { choice: choice },
      options
    )
    @next()
