_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
User = require './user.coffee'

module.exports = class LoggedOutUser extends User
  __isLoggedIn__: false

  url: ->
    # It's possible to login a LoggedOutUser and then
    # persist any data that was saved in an AnonymousSession over to the
    # newly authenticated User before refreshing or... whatever.
    if @isLoggedIn()
      "#{API_URL}/api/v1/me"
    else
      "#{API_URL}/api/v1/me/anonymous_session"

  login: (options = {}) ->
    new Backbone.Model()
      .save @pick('email', 'password'), _.extend {}, options,
        url: '/users/sign_in'
        success: _.wrap options.success, (success, model, response, options) =>
          @__isLoggedIn__ = true
          $.ajaxSettings.headers = _.extend ($.ajaxSettings.headers or {}),
            'X-ACCESS-TOKEN': response.user.accessToken
          success? model, response, options

  signup: (options = {}) ->
    new Backbone.Model()
      .save @pick('name', 'email', 'password'), _.extend {}, options,
        url: "#{API_URL}/api/v1/user"
        success: =>
          @login(_.pick options, 'success')

  register: @::signup

  forgot: (options = {}) ->
    new Backbone.Model()
      .save (@pick 'email'), _.extend {}, options,
        url: "#{API_URL}/api/v1/users/send_reset_password_instructions"
