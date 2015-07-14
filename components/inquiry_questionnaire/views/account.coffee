_ = require 'underscore'
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
    @listenTo @user.related().account, 'sync', @render
    super

  setup: ->
    @user.related().account.fetch()

  __mode__: 'auth'
  mode: ->
    if @__mode__ is 'auth'
      if @user.related().account.id then 'login' else 'signup'
    else
      @__mode__

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

  change: (e) ->
    e.preventDefault()
    @__mode__ = $(e.currentTarget).data 'mode'
    @render()
