bootstrap = require '../../../components/layout/bootstrap'
Backbone = require 'backbone'
sd = require('sharify').data
querystring = require 'querystring'

module.exports.PasswordResetView = class PasswordResetView extends Backbone.View

  initialize: ->
    @model = new Backbone.Model { id: 1 }
    @model.url = "#{sd.API_URL}/api/v1/users/reset_password"
    @model.on 'request', =>
      @$('button').addClass 'avant-garde-box-button-loading'
    @model.on 'error', =>
      @$('button').removeClass 'avant-garde-box-button-loading'

  events:
    'submit': 'save'

  save: (e) ->
    e.preventDefault()
    attrs = querystring.parse(
      window.location.search.replace(/^\?/, '') + '&' + @$el.serialize()
    )
    @model.save attrs,
      success: -> window.location = '/'
      error: (m, err) =>
        @$('.auth-page-error-message').html JSON.parse(err.response).error

module.exports.init = ->
  bootstrap()
  new PasswordResetView el: $('#reset-password-form')
