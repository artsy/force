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
sd = require('sharify').data

class State extends Backbone.Model
  defaults: mode: 'register'

module.exports = class AuthModalView extends ModalView
  _.extend @prototype, Form

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
    { @destination, @successCallback, @afterSignUpAction } = options
    @redirectTo = encodeURIComponent(sanitizeRedirect(options.redirectTo)) if options.redirectTo
    @preInitialize options

    super

  preInitialize: (options = {}) ->
    { @copy, @context, @signupIntent } = options
    @user = new LoggedOutUser
    mode = mode: options.mode if options.mode
    @state = new State mode

    @templateData = _.extend {
      context: @context
      signupIntent: @signupIntent
      copy: @renderCopy(options.copy)
      redirectTo: @currentRedirectTo()
    }, options?.userData

    @listenTo @state, 'change:mode', @updateTemplateAndRender
    @listenTo @state, 'change:mode', @logState
    @on 'rerendered', @initializeMailcheck

    mediator.on 'auth:change:mode', @setMode, this
    mediator.on 'auth:error', @showError
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
    @state.set 'mode', mode

  logState: ->
    analyticsHooks.trigger 'auth:state', message: stateEventMap[@state.get 'mode']

  logClose: =>
    analyticsHooks.trigger 'auth:close', mode: @state.get('mode')

  toggleMode: (e) ->
    e.preventDefault()
    @state.set 'mode', $(e.target).data('mode')

  fbSignup: (e) ->
    e.preventDefault()
    formData = @serializeForm()
    queryData =
      'signup-intent': @signupIntent
      'receive-emails': !!formData['receive_emails']
      'accepted-terms-of-service': !!formData['accepted_terms_of_service']
    queryString = $.param(queryData)
    redirectUrl = sd.AP.facebookPath + '?'
    redirectUrl += queryString
    window.location.href = sd.AP.facebookPath#redirectUrl


  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @user.set (data = @serializeForm())
    @user.set(signupIntent: @signupIntent)
    @user[@state.get 'mode']
      success: @onSubmitSuccess
      error: (model, response, options) =>
        @reenableForm()
        message = @errorMessage response
        mediator.trigger 'auth:error', message

  onSubmitSuccess: (model, response, options) =>
    analyticsHooks.trigger "auth:#{@state.get 'mode'}"
    @reenableForm null, reset: false

    if response.error?
      mediator.trigger 'auth:error', _s.capitalize response.error
    else
      Cookies.set('destination', @destination, expires: 60 * 60 * 24) if @destination

      switch @state.get('mode')
        when 'login'
          Cookies.set('signed_in', true, expires: 60 * 60 * 24 * 7)
        when 'register'
          mediator.trigger 'auth:sign_up:success'
        when 'forgot'
          mediator.trigger 'auth:change:mode', 'reset'

      unless @state.get('mode') is 'reset'
        @undelegateEvents()
        @$('form').submit()

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').text msg

  remove: ->
    mediator.off 'auth:change:mode'
    mediator.off 'auth:error'
    mediator.off 'modal:closed'
    super
