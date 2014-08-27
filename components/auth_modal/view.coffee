_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
Cookies = require 'cookies-js'
{ parse } = require 'url'
ModalView = require '../modal/view.coffee'
Form = require '../mixins/form.coffee'
mediator = require '../../lib/mediator.coffee'
analytics = require '../../lib/analytics.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
{ templateMap, stateEventMap, successEventMap, routeCopyMap } = require './maps.coffee'

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

  initialize: (options) ->
    { @destination } = options
    @redirectTo = options.redirectTo if options.redirectTo
    @preInitialize options
    super

  preInitialize: (options = {}) ->
    { @copy } = options
    @user = new LoggedOutUser
    mode = mode: options.mode if options.mode
    @state = new State mode

    @templateData =
      copy: @renderCopy(options.copy)
      pathname: location.pathname
      redirectTo: @redirectTo

    @listenTo @state, 'change:mode', @reRender
    @listenTo @state, 'change:mode', @logState

    mediator.on 'auth:change:mode', @setMode, this
    mediator.on 'auth:error', @showError
    mediator.on 'modal:closed', @logClose

    @logState()

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
      success: @onSubmitSuccess
      error: (model, response, options) =>
        @reenableForm()
        message = @errorMessage response
        @showError message

  onSubmitSuccess: (model, response, options) =>
    @reenableForm null, reset: false

    if response.error?
      @showError _s.capitalize response.error
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
