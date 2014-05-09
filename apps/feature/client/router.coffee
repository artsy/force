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
    Backbone.history.navigate(@feature.href(), trigger: true, replace: true)

  confirmRegistration: ->
    Backbone.history.navigate(@feature.href(), trigger: true, replace: true)
