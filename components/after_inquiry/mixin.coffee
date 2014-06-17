_ = require 'underscore'
mediator = require '../../lib/mediator.coffee'
CurrentUser = require '../../models/current_user.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
AfterInquiry = require '../after_inquiry/index.coffee'
hasSeen = require '../has_seen/index.coffee'
analytics = require '../../lib/analytics.coffee'

# Mixin that determines whether or not the After Inquiry flow should
# be displayed and ultimately calls save on the inquiry
module.exports =
  maybeSend: (inquiry, options = {}) ->
    @user ?= CurrentUser.orNull() or new LoggedOutUser
    @inquiry ?= inquiry
    @isModal = _.isFunction @close
    @inquiryOptions = options

    if @displayAfterInquiryFlow()
      # If we're in a modal then close it before moving on
      if @isModal
        @close => @initializeAfterInquiry()
      else
        @initializeAfterInquiry()
    else # Send the inquiry normally
      @isModal = false # We want the original success callback to run
      @send()

  initializeAfterInquiry: ->
    new AfterInquiry inquiry: @inquiry, user: @user
    mediator.on 'inquiry:send', (=> @send()), this

  displayAfterInquiryFlow: ->
    @eligibleForAfterInquiryFlow and
    not hasSeen('after-inquiry')

  send: ->
    @inquiry.save null, _.pick (@inquiryOptions or {}),
      # If we are in a modal then we can safely discard the success callback
      # which would close the modal, as we've already closed the initial modal by now
      (if @isModal then ['error'] else ['success', 'error'])...
