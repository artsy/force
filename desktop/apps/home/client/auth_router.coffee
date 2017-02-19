Backbone = require 'backbone'
_ = require 'underscore'
mediator = require '../../../lib/mediator.coffee'
qs = require 'querystring'

module.exports = class HomeAuthRouter extends Backbone.Router

  routes:
    'log_in': 'login'
    'sign_up': 'signup'
    'forgot': 'forgot'

  initialize: ->
    @location = window.location

  login: ->
    error = qs.parse(@location.search.replace /^\?/, '').error
    redirectTo = qs.parse(@location.search.replace /^\?/, '').redirect_uri or qs.parse(@location.search.replace /^\?/, '')['redirect-to']

    # Handle gravity style account created errors
    unless error
      error = qs.parse(@location.search.replace /^\?/, '').account_created_email

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
      mediator.trigger 'open:auth', mode: 'login'
      mediator.trigger 'auth:error', msg
      # Sometimes the previous trigger gets overridden so we trigger again
      _.defer =>
        mediator.trigger 'open:auth', mode: 'login'
        mediator.trigger 'auth:error', msg
    else
      mediator.trigger 'open:auth',
        mode: 'login'
        redirectTo: redirectTo

  signup: ->
    mediator.trigger 'open:auth', mode: 'register'

  forgot: ->
    mediator.trigger 'open:auth', mode: 'forgot'
