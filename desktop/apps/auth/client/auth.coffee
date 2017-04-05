_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
{ parse } = require 'url'
{ API_URL } = require('sharify').data
Form = require '../../../components/mixins/form'
Mailcheck = require '../../../components/mailcheck/index'
mediator = require '../../../lib/mediator'
LoggedOutUser = require '../../../models/logged_out_user'

module.exports.SignUpView = class SignUpView extends Backbone.View
  _.extend @prototype, Form

  events:
    'submit': 'submit'

  initialize: ->
    @user = new LoggedOutUser
    @initializeMailcheck()

  initializeMailcheck: ->
    Mailcheck.run('#js-mailcheck-input-modal', '#js-mailcheck-hint-modal', false)

  onRegisterSuccess: =>
    window.location.href = @afterAuthHref

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    action = $(e.target).data('action')
    @afterAuthHref = $(e.target).data('after-auth')

    @user.set (data = @serializeForm())
    @user[action]
      success: @onRegisterSuccess
      error: (model, resp, opt) =>
        @reenableForm()
        message = @errorMessage resp
        @$('button').attr 'data-state', 'error'
        @$('.auth-errors').text message
        mediator.trigger 'auth:error', message

module.exports.init = ->
  new SignUpView el: $('#auth-page')
