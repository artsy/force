_               = require 'underscore'
Backbone        = require 'backbone'
FlashMessage    = require '../flash/index.coffee'
mediator        = require '../../lib/mediator.coffee'
Questionnaire   = require './questionnaire.coffee'
analytics       = require '../../lib/analytics.coffee'
Cookies         = require 'cookies-js'

# The after inquiry flow is composed of a Flash message and
# a modal Questionnire. This class sets them up and
# facilitates communication between the two.
module.exports = class AfterInquiry
  _.extend @prototype, Backbone.Events

  messagePending : 'Thank you. Your inquiry is sending&hellip;'
  messageSent    : 'Thank you. Your inquiry has been sent.'
  messageError   : 'There was a problem with sending your inquiry'
  pauseInterval  : 2000

  constructor: (options = {}) ->
    { @user, @inquiry } = options

    @setupUser()
    @bindInquiryEvents()

    @flash = new FlashMessage message: @messagePending, autoclose: false

    (@$window = $(window)).bind 'beforeunload', ->
      'Your inquiry has not been sent yet.'

    mediator.once 'modal:closed', =>
      # Send the inquiry if the modal gets closed without
      # the inquiry request taking place
      unless @inquiryRequest
        mediator.trigger 'inquiry:send'

      # If already sent successfully
      if @inquirySent
        _.delay @maybeOnboard, @pauseInterval
      else
        analytics.track.funnel 'Closed inquiry flow prematurely'
        @listenTo @inquiry, 'sync error', =>
          _.delay @maybeOnboard, @pauseInterval
    , this

    # Let the Flash message hang on the screen for a moment
    # before initializing the questionnaire
    _.delay @initializeQuestionnaire, (@pauseInterval / 2)

    analytics.track.funnel 'Started after inquiry flow'

  maybeOnboard: =>
    if @user.needsOnboarding
      Cookies.set('destination', window.location.pathname, expires: 60 * 60 * 24)
      message = "Thanks for creating your account #{@user.get 'name'}.<br>Take 60 seconds to personalize your experience"
      $.post '/flash', message: message, ->
        window.location = '/personalize'
    else
      @remove()

  setupUser: ->
    if @user.id
      # Does a fetch to grab profession on the off chance
      # we have it. No need to wait for it though
      @user.fetch()
    else
      @user.set @inquiry.pick('name', 'email')

  bindInquiryEvents: ->
    @listenTo @inquiry, 'sync', =>
      @flash.update @messageSent
      @inquirySent = true
      analytics.track.funnel 'Inquiry sent from after inquiry flow'
    @listenTo @inquiry, 'error', =>
      @flash.update @messageError
      @inquirySent = true
      analytics.track.funnel 'Inquiry error durring after inquiry flow'
    @listenTo @inquiry, 'request', =>
      @inquiryRequest = true

  initializeQuestionnaire: =>
    @questionnaire = new Questionnaire
      transition : 'slide'
      width      : '450px'
      backdrop   : false
      user       : @user
      inquiry    : @inquiry

  remove: =>
    @flash.close()
    @stopListening()
    @$window.off 'beforeunload'
    mediator.off null, null, this
    mediator.off 'inquiry:send' # originates in the mixin
