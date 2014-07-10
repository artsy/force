_               = require 'underscore'
Backbone        = require 'backbone'
Cookies         = require 'cookies-js'
{ parse }       = require 'url'
ModalView       = require '../modal/view.coffee'
Form            = require '../mixins/form.coffee'
mediator        = require '../../lib/mediator.coffee'
analytics       = require '../../lib/analytics.coffee'
LoggedOutUser   = require '../../models/logged_out_user.coffee'

{ templateMap, stateEventMap, successEventMap } = require './maps.coffee'

module.exports = class AuthModalView extends ModalView
  _.extend @prototype, Form

  className: 'auth'

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

  preInitialize: (options = {}) ->
    @user   = new LoggedOutUser
    @state  = new Backbone.Model(mode: options.mode)

    @templateData =
      copy       : options.copy or 'Enter your name, email and password to join'
      pathname   : location.pathname
      redirectTo : @redirectTo

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
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    # We're logging the event here prior to submission
    # to increase it's chance of being logged
    successEvent = successEventMap[@state.get 'mode']
    analytics.track.funnel successEvent if successEvent

    @user.set (data = @serializeForm())
    @user[@state.get 'mode']
      success : @onSubmitSuccess
      error   : (model, response, options) =>
        @reenableForm()
        message = @errorMessage response
        @showError message

  onSubmitSuccess: (model, response, options) =>
    @reenableForm null, reset: false

    if response.error?
      @showError _.capitalize response.error
    else
      Cookies.set('destination', @destination, expires: 60 * 60 * 24) if @destination

      switch @state.get('mode')
        when 'login'
          Cookies.set('signed_in', true, expires: 60 * 60 * 24 * 7)
          if @redirectTo
            location.href = @redirectTo
          else
            location.reload()
        when 'register'
          location.href = @redirectTo or '/personalize'
        when 'forgot'
          mediator.trigger 'auth:change:mode', 'reset'

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').text msg

  remove: ->
    mediator.off 'auth:change:mode'
    mediator.off 'auth:error'
    mediator.off 'modal:closed'
    super
