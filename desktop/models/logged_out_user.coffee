Q = require 'bluebird-q'
_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL, CSRF_TOKEN, APP_URL } = require('sharify').data
syncWithSessionId = require '../lib/sync_with_session_id'
User = require './user'
sd = require('sharify').data

module.exports = class LoggedOutUser extends User
  __isLoggedIn__: false
  __isRecentlyRegistered__: false

  defaults:
    _csrf: CSRF_TOKEN

  initialize: ->
    syncWithSessionId()

  url: ->
    if @isLoggedIn()
      "#{API_URL}/api/v1/me"
    else if @id?
      "#{API_URL}/api/v1/me/anonymous_session/#{@id}"
    else
      "#{API_URL}/api/v1/me/anonymous_session"

  fetch: (options = {}) ->
    if @isLoggedIn() or @id?
      options.data = _.extend options.data or {}, @pick('email')
      super options
    else
      new Backbone.Collection()
        .fetch _.extend {}, options,
          url: "#{API_URL}/api/v1/me/anonymous_sessions"
          data: _.extend options.data or {}, @pick('email')
          success: _.wrap options.success, (success, args...) =>
            collection = args[0]
            @set collection.first().toJSON() if collection.length
            success? args...

  login: (options = {}) ->
    new Backbone.Model()
      .save @pick('email', 'password', '_csrf'), _.extend {}, options,
        url: "#{APP_URL}#{sd.AP.loginPagePath}"
        success: _.wrap options.success, (success, model, response, options) =>
          @__isLoggedIn__ = true
          @trigger('login') unless options.trigger_login is false
          @unset 'password' # Avoid 403 error on subsequent saves
          $.ajaxSettings.headers = _.extend ($.ajaxSettings.headers or {}),
            'X-ACCESS-TOKEN': response.user.accessToken
          success? model, response, options

  signup: (options = {}) ->
    new Backbone.Model()
      .save @pick('name', 'email', 'password', '_csrf'), _.extend {}, options,
        url: "#{APP_URL}#{sd.AP.signupPagePath}"
        success: =>
          @__isRecentlyRegistered__ = true
          @trigger 'signup'
          @login(_.pick options, 'success', 'error', 'trigger_login')

  register: @::signup

  forgot: (options = {}) ->
    new Backbone.Model()
      .save @pick('email'), _.extend {}, options,
        url: "#{API_URL}/api/v1/users/send_reset_password_instructions"

  repossess: (subsequent_user_id, options = {}) ->
    # Only valid for recently logged in LoggedOutUsers
    return Q.resolve() unless @isLoggedIn()
    edit = new Backbone.Model _.extend { subsequent_user_id: subsequent_user_id }, @pick('id')
    Q(edit.save null, _.extend options, url: "#{API_URL}/api/v1/me/anonymous_session/#{@id}")

  findOrCreate: (options = {}) ->
    Q(@save {}, options)
