_ = require 'underscore'
Backbone = require "backbone"
bootstrap = require "../../../components/layout/bootstrap.coffee"
qs = require 'querystring'
_s = require 'underscore.string'

module.exports.LoginView = class LoginView extends Backbone.View

  initialize: ->
    @$error = @$('.auth-page-error-message')
    @$form = @$('form')
    @renderAuthError()

  renderAuthError: ->
    error = qs.parse(location.search.replace /^\?/, '').error
    # Handle gravity style account created errors
    unless error
      error = qs.parse(location.search.replace /^\?/, '').account_created_email
    return unless error
    msg = switch error
      when 'already-signed-up', 'facebook'
        "You've already signed up with your email address. " +
        "Log in to link your Facebook account in your settings."
      when 'twitter'
        "You've already signed up with your email address. " +
        "Log in to link your Twitter account in your settings."
      when 'account-not-found', 'no-user-access-token', 'no-user'
        "We couldn't find your account. Please sign up."
      when 'twitter-denied'
        "Canceled Twitter log in."
      else
        "Unknown Error: " + error
    @showError msg

  events:
    "submit form": "check"

  check: (e) ->
    e.preventDefault()
    serialized = @serializeForm @$form
    unless !!serialized.email and !!serialized.password
      @showError "Please enter your email and password"
      return
    @$('[type=submit]').addClass 'avant-garde-box-button-loading'
    $.ajax
      url: @$form.attr('action')
      type: 'POST'
      data: serialized
      success: =>
        analyticsHooks.trigger 'auth:login'
        @undelegateEvents()
        @$form.submit()
      error: (xhr) =>
        @$('[type=submit]').removeClass 'avant-garde-box-button-loading'
        @showError JSON.parse(xhr.responseText).error
    false

  showError: (message) =>
    @$error.text message

  serializeForm: ($form) ->
    $form ||= @$('form')
    _.reduce($form.serializeArray(), (memo, input) ->
      memo[input.name] = _s.trim input.value
      memo
    , {})

module.exports.init = ->
  bootstrap()
  new LoginView(el: $("#auth-page"))
