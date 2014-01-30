Backbone = require 'backbone'

module.exports = class HomeAuthRouter extends Backbone.Router

  routes:
    'log_in': 'login'
    'sign_up': 'signup'
    'forgot': 'forgot'

  login: ->
    mediator.trigger 'open:auth', mode: 'login'

  signup: ->
    mediator.trigger 'open:auth', mode: 'register'

  forgot: ->
    mediator.trigger 'open:auth', mode: 'forgot'