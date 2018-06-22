Backbone = require 'backbone'
_ = require 'underscore'
mediator = require '../../../lib/mediator.coffee'
qs = require 'qs'

module.exports = class HomeAuthRouter extends Backbone.Router

  routes:
    'log_in': 'login'
    'sign_up': 'signup'
    'forgot': 'forgot'

  initialize: ->
    @location = window.location
    @parsedLocation = qs.parse(window.location.search.replace /^\?/, '')

  login: ->
    error = @parsedLocation.error
    redirectTo = @parsedLocation.redirect_uri or @parsedLocation['redirect-to']

    # Handle gravity style account created errors
    unless error
      error = @parsedLocation.account_created_email

    if error
      msg = switch error
        when 'already-signed-up', 'facebook'
          "You've already signed up with your email address. " +
          "Log in to link your Facebook account in your settings."
        when 'twitter'
          "You've already signed up with your email address. " +
          "Log in to link your Twitter account in your settings."
        when 'account-not-found', 'no-user-access-token', 'no-user'
          "We couldn't find your account. Please sign up."
        else
          error
      mediator.trigger 'open:auth',
        mode: 'login'
        intent: 'login'
        trigger: 'timed'
        triggerSeconds: 0
        redirectTo: redirectTo

      mediator.trigger 'auth:error', msg

      # # Sometimes the previous trigger gets overridden so we trigger again
      # _.defer =>
      #   mediator.trigger 'open:auth', mode: 'login'
      #   mediator.trigger 'auth:error', msg

    else
      mediator.trigger 'open:auth',
        mode: 'login'
        redirectTo: redirectTo
        intent: 'login'
        trigger: 'timed'
        triggerSeconds: 0

  signup: ->
    redirectTo = @parsedLocation['redirect-to']
    mediator.trigger 'open:auth',
      mode: 'signup',
      redirectTo: if redirectTo then redirectTo else null
      intent: 'signup'
      trigger: 'timed'
      triggerSeconds: 0

  forgot: ->
    email = @parsedLocation.email
    setPassword = @parsedLocation.set_password
    redirectTo = @parsedLocation.reset_password_redirect_to
    mediator.trigger 'open:auth',
      mode: 'forgot',
      email: email,
      setPassword: setPassword,
      redirectTo: redirectTo
      intent: 'forgot'
      trigger: 'timed'
      triggerSeconds: 0

