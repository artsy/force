_ = require 'underscore'
Backbone = require 'backbone'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
templates =
  register: -> require('../templates/account/register.jade') arguments...
  login: -> require('../templates/account/login.jade') arguments...
  forgot: -> require('../templates/account/forgot.jade') arguments...

module.exports = class Account extends StepView
  className: 'iq-account'

  template: ->
    templates[@mode()] arguments...

  __events__:
    'click button': 'submit'
    'click .js-mode': 'change'
    'click .js-iq-save-skip': 'next'

  initialize: ({ @user, @inquiry, @artwork, @state, @modal }) ->
    @modal?.dialog 'bounce-in'
    @active = new Backbone.Model mode: 'auth'

    @listenTo @active, 'change:mode', @render
    @listenTo @active, 'change:mode', @forgot

    super

  setup: ->
    if @user.forgot?
      @sendResetOnce = _.once _.bind(@user.forgot, @user)

  mode: ->
    if (mode = @active.get('mode')) is 'auth'
      if @user.related().account.id then 'login' else 'register'
    else
      mode

  submit: (e) ->
    e.preventDefault()

    form = new Form model: @user, $form: @$('form'), $submit: @$('.js-form-submit')
    return unless form.isReady()

    form.state 'loading'

    @user.set form.data()
    @user[@mode()] # `login` or `signup`
      error: form.error.bind form
      trigger_login: false
      success: (model, { user }) =>
        @user.repossess user.id,
          error: form.error.bind form
          success: =>
            @state.get('inquiry').save {},
              success: =>
                @next()
              error: =>
                @next()

  forgot: (active, mode) ->
    return unless mode is 'forgot'
    @sendResetOnce()

  change: (e) ->
    e.preventDefault()
    @active.set 'mode', $(e.currentTarget).data 'mode'
