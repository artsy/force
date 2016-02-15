_ = require 'underscore'
ModalView = require '../../modal/view.coffee'
mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
template = -> require('../templates/registration-confirmation.jade') arguments...

module.exports = class ConfirmRegistration extends ModalView

  className: 'confirm'

  template: template

  defaults: ->
    width: '510px'
    artwork: null
    paddleNumber: null

  initialize: (options = {}) ->
    @user = CurrentUser.orNull()
    @options = _.defaults options, @defaults()
    _.extend @templateData,
      artwork: @options.artwork
      paddleNumber: @options.paddleNumber
      auction: @model
    super @options

  postRender: ->
    @isLoading()
    @user.fetchBidderForAuction @model,
      error: @isLoaded
      success: (bidder) =>
        if bidder and not bidder.get 'qualified_for_bidding'
          @$('.credit-card-unqualified-msg').show()
        @updatePosition()
        @isLoaded()
