{ Router } = require 'backbone'
{ COLLECTOR_PROFILE } = require('sharify').data
User = require '../../../models/user'
ProfessionalBuyerLandingView = require '../pages/landing/client/view'
ProfessionalBuyerCompleteView = require '../pages/complete/client/view'

module.exports = class ProfessionalBuyerRouter extends Router
  routes:
    'professional-buyer(/)': 'landing'
    'professional-buyer/complete': 'complete'

  initialize: ->
    @user = User.instantiate()
    @user.related().collectorProfile.set COLLECTOR_PROFILE

  landing: ->
    new ProfessionalBuyerLandingView el: $('.js-probuyer-landing-view'), user: @user

  complete: ->
    view = new ProfessionalBuyerCompleteView user: @user
    $('.js-probuyer-complete-view')
      .html view.render().$el
