Backbone    = require 'backbone'
sd          = require('sharify').data
{ parse }   = require 'url'
qs          = require 'querystring'

module.exports.PasswordResetView = class PasswordResetView extends Backbone.View

  initialize: ->
    @model = new Backbone.Model()
    @model.url = "#{sd.API_URL}/api/v1/users/reset_password"
    @model.on 'request', =>
      @$('button').addClass('is-loading')
    @model.on 'error', =>
      @$('button').removeClass('is-loading')

  events:
    'submit': 'save'

  save: (e) ->
    e.preventDefault()
    attrs = @$el.serialize()

    if window?.location?.search?.length
      token = qs.parse(parse(window.location.search).query).reset_password_token
      if token
        attrs += "&reset_password_token=#{token}"

    @model.url = "#{@model.url}?#{attrs}"
    @model.isNew = -> false
    @model.save {},
      success: ->
        window.location = '/'
      error: (m, err) =>
        @$('.auth-page-error-message').html JSON.parse(err.responseText).error

module.exports.init = ->
  new PasswordResetView el: $('#reset-password-form')
