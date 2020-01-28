_ = require 'underscore'
Backbone = require 'backbone'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
FormMixin = require '../../mixins/form'
FormErrorHelpers = require '../../auth_modal/helpers'
sd = require('sharify').data
templates =
  register: -> require('../templates/account/register.jade') arguments...
  login: -> require('../templates/account/login.jade') arguments...
  forgot: -> require('../templates/account/forgot.jade') arguments...
{ repcaptcha } = require "@artsy/reaction/dist/Utils/repcaptcha"

module.exports = class Account extends StepView
  _.extend @prototype, FormMixin
  _.extend @prototype, FormErrorHelpers
  className: 'iq-account'

  template: ->
    templates[@mode()] arguments...

  __events__:
    'click button': 'onSubmit'
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

  onSubmit: (e) ->
    e.preventDefault()
    form = new Form model: @user, $form: @$('form'), $submit: @$('.js-form-submit')
    return unless form.isReady()
    form.state 'loading'

    repcaptcha("signup_submit", (recaptcha_token) =>
      @submit(form, recaptcha_token)
    )

  submit: (form, recaptcha_token) ->
    data = Object.assign {},
      form.data(),
      recaptcha_token: recaptcha_token
    @user.set data
    @user[@mode()] # `login` or `register`
      error: form.error.bind form
      trigger_login: false
      success: (model, { user }) =>
        @user.repossess user.id,
          error: form.error.bind form
          success: =>
            if sd.COMMERCIAL?.enableNewInquiryFlow
              @next()
            else
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
