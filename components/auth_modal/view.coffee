_                 = require 'underscore'
Backbone          = require 'backbone'
ModalView         = require '../modal/view.coffee'
Form              = require '../mixins/form.coffee'
mediator          = require '../../lib/mediator.coffee'
{ parse }         = require 'url'
Cookies           = require 'cookies-js'
analytics         = require '../../lib/analytics.coffee'

{ templateMap, modelMap, stateEventMap, successEventMap } = require './maps.coffee'

module.exports = class AuthModalView extends ModalView
  _.extend @prototype, Form

  className: 'auth'

  redirectTo: '/personalize'

  template: ->
    templateMap[@state.get 'mode'] arguments...

  events: -> _.extend super,
    'click .auth-toggle' : 'toggleMode'
    'submit form'        : 'submit'
    'click #auth-submit' : 'submit'

  initialize: (options) ->
    { @destination } = options
    @redirectTo = options.redirectTo if options.redirectTo
    @preInitialize options
    super

  preInitialize: (options) ->
    @state = new Backbone.Model(mode: options.mode)
    @templateData =
      copy: options.copy or 'Enter your name, email and password to join'
      pathname: location.pathname
      redirectTo: @redirectTo

    @listenTo @state, 'change:mode', @reRender
    @listenTo @state, 'change:mode', @logState

    mediator.on 'auth:change:mode', @setMode, this
    mediator.on 'auth:error', @showError
    mediator.on 'modal:closed', @logClose

    @logState()

  setMode: (mode) ->
    @state.set 'mode', mode

  logState: ->
    analytics.track.funnel stateEventMap[@state.get 'mode']

  logClose: =>
    analytics.track.funnel 'Closed auth modal', mode: @state.get('mode')

  toggleMode: (e) ->
    e.preventDefault()
    @state.set 'mode', $(e.target).data('mode')

  submit: (e) ->
    return unless @validateForm()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    # We're logging the event here prior to submission
    # to increase it's chance of being logged
    successEvent = successEventMap[@state.get 'mode']
    analytics.track.funnel successEvent if successEvent

    new modelMap[@state.get 'mode']().save @serializeForm(),
      success: @onSubmitSuccess
      error: (model, xhr) =>
        message = @errorMessage xhr
        @showError message

  onSubmitSuccess: (model, res, options) =>
    if res.error?
      @showError _.capitalize res.error
    else
      oneDayFromNow = new Date()
      oneDayFromNow.setDate(sevenDaysFromNow.getDate() + 1)
      Cookies.set('destination', @destination, expires: oneDayFromNow) if @destination

      if @state.get('mode') is 'login'
        sevenDaysFromNow = new Date()
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
        Cookies.set('signed_in', true, expires: sevenDaysFromNow)

      if @state.get('mode') is 'register'
        location.href = @redirectTo
      else
        location.reload()

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').text msg

  remove: ->
    mediator.off 'auth:change:mode'
    mediator.off 'auth:error'
    mediator.off 'modal:closed'
    super
