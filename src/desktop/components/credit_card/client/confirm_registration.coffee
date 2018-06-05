_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
mediator = require '../../../lib/mediator.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
CurrentUser = require '../../../models/current_user.coffee'
template = -> require('../templates/registration-confirmation.jade') arguments...

module.exports = class ConfirmRegistrationModal extends ModalView

  className: 'confirm'

  template: template

  events: -> _.extend super,
    'click .bid-close-button': 'close'

  initialize: ({ @auction }) ->
    @user = CurrentUser.orNull()
    _.extend @templateData, paddleNumber: @user.get('paddle_number')
    super width: '510px'

  postRender: =>
    @isLoading()
    @user.fetchBidderForAuction @auction,
      error: @isLoaded
      success: (bidder) =>
        qualifiedForBidding = bidder && bidder.get 'qualified_for_bidding'

        if !qualifiedForBidding
          @$('.credit-card-unqualified-msg').show()
          analyticsHooks.trigger 'creditcard:unqualified',
            auction_slug: @auction.get('id')
            bidder_id: bidder.get('id')
            user_id: @user.get('id')

        @updatePosition()
        @isLoaded()
        @cleanLocation()
  
  cleanLocation: ->
    replaceModalTriggerPath = location.pathname.replace('/confirm-registration', '')
    history.replaceState({}, document.title, replaceModalTriggerPath)


  close: (event) ->
    @cleanLocation()
    super
