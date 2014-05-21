_               = require 'underscore'
FlashMessage    = require '../flash/index.coffee'
mediator        = require '../../lib/mediator.coffee'
Questionnaire   = require './questionnaire.coffee'

# The after inquiry flow is composed of a Flash message and
# a modal Questionnire. This class sets them up and the mediator
# facilitates communication between the two. We
module.exports = class AfterInquiry
  messagePending : 'Thank you. Your inquiry is sending&hellip;'
  messageSent    : 'Your inquiry has been sent.'
  messageError   : 'There was a problem with sending your inquiry'
  pauseInterval  : 500

  constructor: (options = {}) ->
    { @user, @inquiry } = options

    @setupUser()
    @announceInquiry()
    @inquiryEvents()

    @flash = new FlashMessage message: @messagePending, autoclose: false
    mediator.on 'modal:closed', =>
      @flash.close()
      # Send the inquiry if the modal gets closed
      unless @inquiryRequest?
        mediator.trigger 'inquiry:send'
      # And we're done...
      @remove()
    , this

    # Let the Flash message hang on the screen for a moment
    # before initializing the questionnaire
    _.delay @initializeQuestionnaire, @pauseInterval

  setupUser: ->
    if @user.id
      # Does a fetch to grab profession on the off chance
      # we have it. No need to wait for it though
      @user.fetch()
    else
      @user.set @inquiry.pick('name', 'email')

  announceInquiry: ->
    @inquiry.on 'sync', ->
      mediator.trigger 'inquiry:success'
    @inquiry.on 'error', ->
      mediator.trigger 'inquiry:error'
    @inquiry.on 'request', ->
      mediator.trigger 'inquiry:request'

  inquiryEvents: ->
    mediator.on 'inquiry:success', =>
      @flash.update @messageSent
      @inquirySent = true
    , this
    mediator.on 'inquiry:error', (=> @flash.update @messageError), this
    mediator.on 'inquiry:request', (=> @inquiryRequest = true), this

  initializeQuestionnaire: =>
    @questionnaire = new Questionnaire
      transition : 'slide'
      width      : '450px'
      backdrop   : false
      user       : @user
      inquiry    : @inquiry

  remove: ->
    mediator.off null, null, this
