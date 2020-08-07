_ = require 'underscore'
Cookies = require 'cookies-js'
Backbone = require 'backbone'
{ API_URL, APP_URL, SESSION_ID } = require('sharify').data
User = require './user.coffee'
sd = require('sharify').data
IS_TEST_ENV = require('sharify').data.NODE_ENV not in ['production', 'staging', 'development']

syncWithSessionId = ->
  unless Backbone.__SESSION_SYNC_WRAPPED__ or IS_TEST_ENV
    data = session_id: SESSION_ID

    Backbone.__SESSION_SYNC_WRAPPED__ = true

    Backbone.sync = _.wrap Backbone.sync, (sync, method, model, options = {}) ->
      switch method
        when 'read'
          options.data = _.extend options.data or {}, data
        when 'delete'
          options.processData = true
          options.data = data
        else
          @set data, silent: true

      sync method, model, options

module.exports = class LoggedOutUser extends User
  __isLoggedIn__: false
  __isRecentlyRegistered__: false

  defaults:
    _csrf: Cookies && Cookies.get && Cookies.get 'CSRF_TOKEN' || undefined

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
      .save @pick('email', 'password', 'otp_attempt', '_csrf'), _.extend {}, options,
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
      .save @pick(
        'name',
        'email',
        'password',
        '_csrf',
        'signupIntent',
        'signupReferer',
        'accepted_terms_of_service',
        'agreed_to_receive_emails'
        'recaptcha_token'
      ), _.extend {}, options,
        url: "#{APP_URL}#{sd.AP.signupPagePath}"
        success: =>
          @__isRecentlyRegistered__ = true
          @trigger 'signup'
          @login(_.pick options, 'success', 'error', 'trigger_login')

  register: @::signup

  forgot: (options = {}) ->
    attrs = @pick('email')
    attrs.reset_password_redirect_to = sd.RESET_PASSWORD_REDIRECT_TO || null
    attrs.mode = if sd.SET_PASSWORD == 'true' then 'fair_set_password' else sd.SET_PASSWORD || null

    new Backbone.Model()
      .save attrs, _.extend {}, options,
        url: "#{API_URL}/api/v1/users/send_reset_password_instructions"
        success: _.wrap options.success, (success, args...) ->
          success? args...

  repossess: (subsequent_user_id, options = {}) ->
    # Only valid for recently logged in LoggedOutUsers
    return Promise.resolve() unless @isLoggedIn()
    edit = new Backbone.Model _.extend { subsequent_user_id: subsequent_user_id }, @pick('id')
    Promise.resolve(edit.save null, _.extend options, url: "#{API_URL}/api/v1/me/anonymous_session/#{@id}")

  findOrCreate: (options = {}) ->
    Promise.resolve(@save {}, options)
