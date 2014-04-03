_                 = require 'underscore'
Backbone          = require 'backbone'
ModalView         = require '../modal/view.coffee'
Form              = require '../mixins/form.coffee'
mediator          = require '../../lib/mediator.coffee'
{ parse }         = require 'url'
{ createCookie }  = require '../util/cookie.coffee'
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
    e.preventDefault()

    if @validateForm()
      @$('button').attr 'data-state', 'loading'
      new modelMap[@state.get 'mode']().save @serializeForm(),
        success: @onSubmitSuccess
        error: (m, xhr) => @errorMessage xhr

  onSubmitSuccess: (model, res, options) =>
    if res.error?
      @showError _.capitalize res.error
    else
      createCookie 'destination', @destination, 1 if @destination

      successEvent = successEventMap[@state.get 'mode']
      analytics.track.funnel successEvent if successEvent

      if @state.get('mode') is 'login'
        createCookie 'signed_in', true, 7

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
