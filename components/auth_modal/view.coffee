_                  = require 'underscore'
Backbone           = require 'backbone'
ModalView          = require '../modal/view.coffee'
Form               = require '../mixins/form.coffee'
mediator           = require '../../lib/mediator.coffee'
{ parse }          = require 'url'
{ ARTSY_URL }      = require('sharify').data

templates =
  signup:   -> require('./templates/signup.jade') arguments...
  login:    -> require('./templates/login.jade') arguments...
  register: -> require('./templates/register.jade') arguments...
  forgot:   -> require('./templates/forgot.jade') arguments...
  reset:    -> require('./templates/reset.jade') arguments...

class Login extends Backbone.Model
  url: "/force/users/sign_in"

class Signup extends Backbone.Model
  url: "/force/users/invitation/accept"

class Forgot extends Backbone.Model
  url: "#{ARTSY_URL}/api/v1/users/send_reset_password_instructions"

  save: (data, options) ->
    options.success = ->
      mediator.trigger 'auth:change:mode', 'reset'
    super

models =
  login: Login
  forgot: Forgot
  register: Signup

module.exports = class AuthModalView extends ModalView
  _.extend @prototype, Form

  className: 'auth'

  template: ->
    templates[@state.get('mode')] arguments...

  events: -> _.extend super,
    'click .auth-toggle': 'toggleMode'
    'submit form'       : 'submit'
    'click #auth-submit': 'submit'

  initialize: (options) ->
    @preInitialize options
    super

  preInitialize: (options) ->
    @state = new Backbone.Model(mode: options.mode)
    @templateData =
      copy: options.copy or 'Enter your name, email and password to join'
      pathname: location.pathname
    @listenTo @state, 'change:mode', @reRender
    mediator.on 'auth:change:mode', @setMode, this
    mediator.on 'auth:error', @showError

  setMode: (mode) ->
    @state.set 'mode', mode

  toggleMode: (e) ->
    e.preventDefault()
    @state.set 'mode', $(e.target).data('mode')

  submit: (e) ->
    e.preventDefault()

    if @validateForm()
      @$('button').attr 'data-state', 'loading'

      new models[@state.get('mode')]().save @serializeForm(),
        success: =>
          href = '/force/log_in_to_artsy'
          href += '?redirect-to=/personalize' if @state.get('mode') is 'register'
          location.href = href
        error: (model, xhr, options) =>
          @errorMessage(xhr) # Display error

  showError: (msg) =>
    @$('button').attr 'data-state', 'error'
    @$('.auth-errors').text msg