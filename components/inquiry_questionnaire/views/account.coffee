_ = require 'underscore'
Backbone = require 'backbone'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
templates =
  signup: -> require('../templates/account/signup.jade') arguments...
  login: -> require('../templates/account/login.jade') arguments...
  forgot: -> require('../templates/account/forgot.jade') arguments...

module.exports = class Account extends StepView
  className: 'iq-account'

  template: ->
    templates[@mode()] arguments...

  __events__:
    'click .js-mode': 'change'
    'click button': 'submit'

  initialize: ({ @user, @state, @artwork }) ->
    @active = new Backbone.Model mode: 'auth'

    @listenTo @user.related().account, 'sync', @render
    @listenTo @active, 'change:mode', @render
    @listenTo @active, 'change:mode', @forgot

    super

  setup: ->
    @user.related().account.fetch()
    @sendResetOnce = _.once _.bind(@user.forgot, @user)

  mode: ->
    if (mode = @active.get('mode')) is 'auth'
      if @user.related().account.id then 'login' else 'signup'
    else
      mode

  submit: (e) ->
    form = new Form model: @user, $form: @$('form'), $submit: @$('.js-form-submit')
    return unless form.start()
    e.preventDefault()
    form.state 'loading'
    @user.set form.serializer.data()
    @user[@mode()]
      error: _.bind(form.error, form)
      success: =>
        @next()

  forgot: (active, mode) ->
    return unless mode is 'forgot'
    @sendResetOnce()

  change: (e) ->
    e.preventDefault()
    @active.set 'mode', $(e.currentTarget).data 'mode'
