_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
User = require './user.coffee'

# Since this model gets initialized in a logged out state,
# to persist any changes to it we have to manually inject
# the access token after a login takes place
injectToken = (success) ->
  _.wrap success, (success, model, response, options) ->
    $.ajaxSettings.headers = _.extend ($.ajaxSettings.headers or {}),
      'X-ACCESS-TOKEN': response.user.accessToken
    success model, response, options

module.exports = class LoggedOutUser extends User
  url: ->
    "#{sd.API_URL}/api/v1/me"

  login: (options = {}) ->
    settings = _.defaults options,
      url: '/users/sign_in'
      success: injectToken -> location.reload()
    new Backbone.Model().save (@pick 'email', 'password'), settings

  signup: (options = {}) ->
    settings = _.defaults options,
      url: '/users/invitation/accept'
      success: injectToken -> location.reload()
    settings.success = injectToken settings.success
    new Backbone.Model().save (@pick 'name', 'email', 'password'), settings

  # Alias #signup
  register: @::signup

  forgot: (options = {}) ->
    settings = _.defaults options,
      url: "#{sd.API_URL}/api/v1/users/send_reset_password_instructions"
    new Backbone.Model().save (@pick 'email'), settings
