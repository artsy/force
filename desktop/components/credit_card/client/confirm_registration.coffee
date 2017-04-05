_ = require 'underscore'
ModalView = require '../../modal/view'
mediator = require '../../../lib/mediator'
analyticsHooks = require '../../../lib/analytics_hooks'
CurrentUser = require '../../../models/current_user'
template = -> require('../templates/registration-confirmation.jade') arguments...

module.exports = class ConfirmRegistrationModal extends ModalView

  className: 'confirm'

  template: template

  initialize: ({ @auction }) ->
    @user = CurrentUser.orNull()
    _.extend @templateData, paddleNumber: @user.get('paddle_number')
    super width: '510px'

  postRender: =>
    @isLoading()
    @user.fetchBidderForAuction @auction,
      error: @isLoaded
      success: (bidder) =>
        if bidder and not bidder.get 'qualified_for_bidding'
          @$('.credit-card-unqualified-msg').show()
          analyticsHooks.trigger 'creditcard:unqualified',
            auction_slug: @auction.get('id')
            bidder_id: bidder.get('id')
            user_id: @user.get('id')
        @updatePosition()
        @isLoaded()
