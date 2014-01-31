Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
qs = require 'querystring'

module.exports = class HomeAuthRouter extends Backbone.Router

  routes:
    'log_in': 'login'
    'sign_up': 'signup'
    'forgot': 'forgot'

  login: ->
    error = qs.parse(location.search.replace /^\?/, '').error
    if error
      msg = switch error
        when 'already-signed-up'
          "You've already signed up with your email address. " +
          "Log in to link your Facebook account in your settings."
        when 'account-not-found'
          "We couldn't find your account. Please sign up."
        else
          "Unknown error."
      mediator.trigger 'open:auth', mode: 'login'
      mediator.trigger 'auth:error', msg
    else
      mediator.trigger 'open:auth', mode: 'login'

  signup: ->
    mediator.trigger 'open:auth', mode: 'register'

  forgot: ->
    mediator.trigger 'open:auth', mode: 'forgot'