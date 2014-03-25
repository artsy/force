mediator        = require '../../lib/mediator.coffee'
Backbone        = require 'backbone'
{ ARTSY_URL }   = require('sharify').data

class Login extends Backbone.Model
  url: "/users/sign_in"

class Signup extends Backbone.Model
  url: "/users/invitation/accept"

class Forgot extends Backbone.Model
  url: "#{ARTSY_URL}/api/v1/users/send_reset_password_instructions"

  save: (data, options) ->
    options.success = ->
      mediator.trigger 'auth:change:mode', 'reset'
    super

module.exports =
  templateMap:
    signup   : -> require('./templates/signup.jade') arguments...
    login    : -> require('./templates/login.jade') arguments...
    register : -> require('./templates/register.jade') arguments...
    forgot   : -> require('./templates/forgot.jade') arguments...
    reset    : -> require('./templates/reset.jade') arguments...

  stateEventMap:
    signup   : 'Viewed sign up options'
    login    : 'Viewed login form'
    register : 'Viewed register using email form'
    forgot   : 'Viewed forgot password form'
    reset    : 'Completed password reset'

  modelMap:
    login    : Login
    forgot   : Forgot
    register : Signup
