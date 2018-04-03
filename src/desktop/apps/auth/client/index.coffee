_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
{ parse } = require 'url'
{ API_URL, REDIRECT_TO } = require('sharify').data
Form = require '../../../components/mixins/form.coffee'

module.exports.PasswordResetView = class PasswordResetView extends Backbone.View
  _.extend @prototype, Form

  events:
    'click button': 'submit'

  initialize: ->
    @model = new Backbone.Model
    @model.url = "#{API_URL}/api/v1/users/reset_password"
    @model.isNew = -> false

    @$button = @$('button')
    @$errors = @$('.auth-page-error-message')

    @listenTo @model, 'request', =>
      @$button.attr 'data-state', 'loading'
    @listenTo @model, 'error', =>
      @$button.attr 'data-state', 'error'

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @model.save @serializeForm(),
      success: ->
        window.location = REDIRECT_TO || '/log_in'
      error: (model, response, options) =>
        @reenableForm()
        @$errors.html @errorMessage(response)

module.exports.init = ->
  new PasswordResetView el: $('#reset-password-page')
