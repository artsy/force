_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
{ parse } = require 'url'
ModalView = require '../modal/view.coffee'
Form = require '../mixins/form.coffee'
mediator = require '../../lib/mediator.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
{ templateMap, stateEventMap, routeCopyMap } = require './maps.coffee'
sanitizeRedirect = require '@artsy/passport/sanitize-redirect'
Mailcheck = require '../mailcheck/index.coffee'
isEigen = require './eigen.coffee'
FormErrorHelpers = require('../auth_modal/helpers')

{ trackAccountCreation } = require '../../analytics/account_creation.js'

class State extends Backbone.Model
  defaults: mode: 'register'

module.exports = class AuthModalView extends ModalView
  _.extend @prototype, Form
  _.extend @prototype, FormErrorHelpers

  className: 'auth'

  template: ->
    templateMap[@state.get 'mode'] arguments...

  events: -> _.extend super,
    'click .auth-toggle': 'toggleMode'
    'submit form': 'submit'
    'click #auth-submit': 'submit'
    'click #signup-fb': 'fbSignup'

  initialize: (options) ->
    return if isEigen.checkWith options
    { @destination, @afterSignUpAction } = options
    @redirectTo = encodeURIComponent(sanitizeRedirect(options.redirectTo)) if options.redirectTo

    @preInitialize options
    super

  preInitialize: (options = {}) ->
    { @copy, @context, @context_module, @intent, @signupIntent } = options

    @signupReferer = location.href
    @user = new LoggedOutUser
    mode = mode: options.mode if options.mode
    @state = new State mode
    @templateData = _.extend {
      context: @context
      context_module: @context_module
      email: options.email
      intent: @intent
      setPassword: options.setPassword
      signupIntent: @signupIntent
      signupReferer: @signupReferer
      copy: @renderCopy(options.copy)
      redirectTo: @currentRedirectTo()
    }, options?.userData
    console.log('@templateData', @templateData)
    @listenTo @state, 'change:mode', @updateTemplateAndRender
    @listenTo @state, 'change:mode', @logState
    @on 'rerendered', @initializeMailcheck

    mediator.on 'auth:change:mode', @setMode, this
    mediator.on 'auth:error', @showFormError
    mediator.on 'modal:closed', @logClose

    @logState()

    Cookies.set 'postSignupAction', JSON.stringify(@afterSignUpAction) if @afterSignUpAction
    Cookies.set('destination', @destination, expires: 60 * 60 * 24) if @destination

  currentRedirectTo: ->
    currentPath = location.pathname
    postLoginPath = @redirectTo or currentPath
    postSignupPath = @redirectTo or '/personalize'
    mode = @state.get 'mode'
    if (mode is 'signup' or mode is 'register') and !@destination
      @destination = currentPath unless @redirectTo

    switch mode
      when 'login' then postLoginPath
      when 'signup' then postSignupPath
      when 'register' then postSignupPath
      else @redirectTo or '/'

  updateTemplateAndRender: ->
    @templateData.redirectTo = @currentRedirectTo()
    @reRender()

  initializeMailcheck: ->
    if @state.get('mode') is 'register'
      Mailcheck.run('#js-mailcheck-input-modal', '#js-mailcheck-hint-modal', false)

  renderCopy: (copy) ->
    attrs = if copy?
      if _.isObject copy
        containsRequired = _.partial _.contains, ['signup', 'register', 'login']
        # Ensure the object has one of the required copy keys
        copy if _.any _.keys(copy), containsRequired
      else if _.isString copy
        # Return an object with the initialized state + the specified copy
        _.tap {}, (hsh) =>
          hsh[@state.get 'mode'] = copy
    else # Fallback to route copy
      routeCopy = routeCopyMap[@redirectTo]
    # Ensure we return an object
    attrs or {}
    new Backbone.Model attrs

  setMode: (mode) ->
    console.log('setMode', mode)
    @state.set 'mode', mode

  logState: ->
    analyticsHooks.trigger 'auth:state', message: stateEventMap[@state.get 'mode']

  logClose: =>
    analyticsHooks.trigger 'auth:close', mode: @state.get('mode')

  toggleMode: (e) ->
    e.preventDefault()
    @state.set 'mode', $(e.target).data('mode')

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    formData = @serializeForm()
    userData = Object.assign {}, formData
    @user.set (data = userData)
    console.log(userData)
    @user.set
      context_module: @context_module
      intent: @intent
      signupIntent: @signupIntent
      signupReferer: @signupReferer
    console.log(@user.attributes)
    @user[@state.get 'mode']
      success: (model, response, options) =>
        console.log('user success')
        debugger
        @onSubmitSuccess(model, response, options)
      error: (model, response, options) =>
        @reenableForm()
        message = @errorMessage response
        mediator.trigger 'auth:error', message

  onSubmitSuccess: (model, response, options) =>
    console.log('onSubmitSuccess')
    debugger
    analyticsHooks.trigger "auth:#{@state.get 'mode'}"
    @reenableForm null, reset: false

    if response.error?
      mediator.trigger 'auth:error', _s.capitalize response.error
    else
      Cookies.set('destination', @destination, expires: 60 * 60 * 24) if @destination
      debugger
      trackAccountCreation = trackAccountCreation(options)
      debugger

      switch @state.get('mode')
        when 'login'
          Cookies.set('signed_in', true, expires: 60 * 60 * 24 * 7)
        when 'register'
          debugger
          mediator.trigger 'auth:sign_up:success'
        when 'forgot'
          mediator.trigger 'auth:change:mode', 'reset'

      unless @state.get('mode') is 'reset'
        @undelegateEvents()
        @$('form').submit()

  showFormError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @showError(msg)

  showError: (msg) =>
    @$('.auth-errors').text msg

  remove: ->
    mediator.off 'auth:change:mode'
    mediator.off 'auth:error'
    mediator.off 'modal:closed'
    super
