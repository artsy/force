_               = require 'underscore'
mediator        = require '../../lib/mediator.coffee'
CurrentUser     = require '../../models/current_user.coffee'
LoggedOutUser   = require '../../models/logged_out_user.coffee'
FlashMessage    = require '../flash/index.coffee'
AfterInquiry    = require '../after_inquiry/index.coffee'
hasSeen         = require '../has_seen/index.coffee'

# Mixin that determines whether or not the After Inquiry flow should
# be displayed and ultimately calls save on the inquiry
module.exports =
  maybeSend: (inquiry, options = {}) ->
    @user ?= CurrentUser.orNull() or new LoggedOutUser

    if @displayAfterInquiryFlow()
      # If we're in a modal then close it before moving on
      if _.isFunction @close
        @close => @initializeAfterInquiry inquiry
      else
        @initializeAfterInquiry inquiry
    # Send the inquiry normally
    else
      @send inquiry, options

  # We throw out any callbacks passed in because
  # AfterInquiry will handle those itself
  initializeAfterInquiry: (inquiry) ->
    new AfterInquiry inquiry: inquiry, user: @user
    mediator.on 'inquiry:send', => @send inquiry

  displayAfterInquiryFlow: ->
    not hasSeen('after-inquiry') and @eligibleForAfterInquiryFlow

  send: (inquiry, options = {}) ->
    inquiry.save null, _.pick(options, 'success', 'error')
