_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
template = -> require('../templates/registration-confirmation.jade') arguments...

module.exports = class ConfirmRegistrationModal extends ModalView

  className: 'confirm'

  template: template

  initialize: ({ @auction }) ->
    @user = CurrentUser.orNull()
    debugger
    _.extend @templateData, paddleNumber: @user.get('paddle_number')
    super width: '510px'

  postRender: ->
    @isLoading()
    @user.fetchBidderForAuction @auction,
      error: @isLoaded
      success: (bidder) =>
        if bidder and not bidder.get 'qualified_for_bidding'
          @$('.credit-card-unqualified-msg').show()
        @updatePosition()
        @isLoaded()
