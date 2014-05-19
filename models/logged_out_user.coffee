_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
Geo       = require './mixins/geo.coffee'

module.exports = class LoggedOutUser extends Backbone.Model
  _.extend @prototype, Geo

  login: (options = {}) ->
    settings = _.defaults options,
      url     : '/users/sign_in'
      success : -> location.reload()
    new Backbone.Model().save (@pick 'email', 'password'), settings

  signup: (options = {}) ->
    settings = _.defaults options,
      url     : '/users/invitation/accept'
      success : -> location.reload()
    new Backbone.Model().save (@pick 'name', 'email', 'password'), settings

  # Alias #signup
  register: @::signup

  forgot: (options = {}) ->
    settings = _.defaults options,
      url : "#{sd.API_URL}/api/v1/users/send_reset_password_instructions"
    new Backbone.Model().save (@pick 'email'), settings
