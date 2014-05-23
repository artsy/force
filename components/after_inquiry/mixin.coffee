_               = require 'underscore'
mediator        = require '../../lib/mediator.coffee'
CurrentUser     = require '../../models/current_user.coffee'
LoggedOutUser   = require '../../models/logged_out_user.coffee'
FlashMessage    = require '../flash/index.coffee'
AfterInquiry    = require '../after_inquiry/index.coffee'
hasSeen         = require '../has_seen/index.coffee'
analytics       = require '../../lib/analytics.coffee'

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
    # Send the inquiry normally
    else
      @send()

  initializeAfterInquiry: ->
    new AfterInquiry inquiry: @inquiry, user: @user
    mediator.on 'inquiry:send', (=> @send()), this

  displayAfterInquiryFlow: ->
    not hasSeen('after-inquiry') and @eligibleForAfterInquiryFlow

  send: ->
    options = _.pick (@inquiryOptions or {}), 'success', 'error'

    if @user?.has 'accessToken'
      options.beforeSend = (xhr) =>
        xhr.setRequestHeader('X-ACCESS-TOKEN', @user.get 'accessToken')

    @inquiry.save null, options
