Backbone                  = require 'backbone'
CurrentUser               = require '../../../models/current_user.coffee'
ConfirmBidModal           = require '../../../components/credit_card/client/confirm_bid.coffee'
ConfirmRegistrationModal  = require '../../../components/credit_card/client/confirm_registration.coffee'
mediator                  = require '../../../lib/mediator.coffee'
analytics                 = require '../../../lib/analytics.coffee'

module.exports = class FeatureRouter extends Backbone.Router
  routes:
    'feature/:id/confirm-bid'          : 'confirmBid'
    'feature/:id/confirm-registration' : 'confirmRegistration'

  initialize: (options) ->
    { @feature }  = options
    @currentUser  = CurrentUser.orNull()

  fetchUser: (success) ->
    return unless @currentUser
    @currentUser.fetch success: success

  confirmBid: ->
    @fetchUser =>
      new ConfirmBidModal feature: @feature, paddleNumber: @currentUser.get('paddle_number')
      mediator.on 'modal:closed', => Backbone.history.navigate(@feature.href(), trigger: true, replace: true)
      analytics.track.click "Showed 'Confirm bid' on feature page"

  confirmRegistration: ->
    @fetchUser =>
      new ConfirmRegistrationModal feature: @feature, paddleNumber: @currentUser.get('paddle_number')
      mediator.on 'modal:closed', => Backbone.history.navigate(@feature.href(), trigger: true, replace: true)
      analytics.track.click "Showed 'Confirm registration' on feature page"
