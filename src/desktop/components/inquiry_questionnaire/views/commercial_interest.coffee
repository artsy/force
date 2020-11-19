StepView = require './step.coffee'
{ setAnalyticsClientReferrerOptions } = require "../../../../lib/analytics/setAnalyticsClientReferrerOptions"

template = -> require('../templates/commercial_interest.jade') arguments...

module.exports = class CommercialInterest extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'serialize'
    'click .js-iq-collector-level': 'trackCommercialInterestClick'

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

  trackCommercialInterestClick: (e) ->
    collector_level = $(e.currentTarget).value
    options = setAnalyticsClientReferrerOptions()
    window.analytics.track(
      'inquiry_questionnaire: Clicked "Yes" or "No" button on commercial_interest',
      { collector_level: collector_level }
      options
    )
