_ = require 'underscore'
Backbone = require 'backbone'
{ SESSION_ID } = require('sharify').data
Geo = require './mixins/geo.coffee'

# Base User model for shared functionality between
# CurrentUser and LoggedOutUser
module.exports = class User extends Backbone.Model
  _.extend @prototype, Geo

  # This refreshes the user data in the session so that saved data
  # will stay in sync on reloads
  refresh: (options = {}) ->
    @fetch _.extend(url: '/user/refresh', options)

  isCollector: ->
    @get('collector_level') >= 3

  isLoggedIn: ->
    @__isLoggedIn__

  @instantiate: ->
    CurrentUser = require './current_user.coffee'
    LoggedOutUser = require './logged_out_user.coffee'

    CurrentUser.orNull() or
    new LoggedOutUser session_id: SESSION_ID
