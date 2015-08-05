Q = require 'q'
_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
syncWithSessionId = require '../lib/sync_with_session_id.coffee'
User = require './user.coffee'

module.exports = class LoggedOutUser extends User
  __isLoggedIn__: false

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
      .save @pick('email'), _.extend {}, options,
        url: "#{API_URL}/api/v1/users/send_reset_password_instructions"

  repossess: ->
    # Only valid for recently logged in, LoggedOutUsers
    return Q.resolve() unless @isLoggedIn()

    { collectorProfile } = @related()
    { userInterests } = collectorProfile.related()

    @unset 'password'
    @unset 'phone'

    collectorProfile.set @attributes
    collectorProfile.unset 'id'

    userInterests.collectorProfile = null
    userInterests.each (x) ->
      x.unset 'id'
      x.urlRoot = userInterests.urlRoot()

    Q.all _.flatten [
      @save()
      collectorProfile.findOrCreate()
      userInterests.invoke 'save'
    ]

  findOrCreate: (options = {}) ->
    Q(@save {}, options)
