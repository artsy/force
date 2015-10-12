Q = require 'bluebird-q'
_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
syncWithSessionId = require '../lib/sync_with_session_id.coffee'
User = require './user.coffee'

module.exports = class LoggedOutUser extends User
  __isLoggedIn__: false
  __isRecentlyRegistered__: false

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
        url: '/users/sign_in'
        success: _.wrap options.success, (success, model, response, options) =>
          @__isLoggedIn__ = true
          @trigger 'login'
          $.ajaxSettings.headers = _.extend ($.ajaxSettings.headers or {}),
            'X-ACCESS-TOKEN': response.user.accessToken
          success? model, response, options

  signup: (options = {}) ->
    new Backbone.Model()
      .save @pick('name', 'email', 'password'), _.extend {}, options,
        url: "#{API_URL}/api/v1/user"
        success: =>
          @__isRecentlyRegistered__ = true
          @trigger 'signup'
          @login(_.pick options, 'success')

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
