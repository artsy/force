_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
{ SESSION_ID } = require('sharify').data
Geo = require './mixins/geo.coffee'
Relations = require './mixins/relations/user.coffee'

# Base User model for shared functionality between
# CurrentUser and LoggedOutUser
module.exports = class User extends Backbone.Model
  _.extend @prototype, Geo
  _.extend @prototype, Relations

  # This refreshes the user data in the session so that saved data
  # will stay in sync on reloads
  refresh: (options = {}) ->
    @fetch _.extend(url: '/user/refresh', options)

  isCollector: ->
    @get('collector_level') >= 3

  isCommercial: ->
    @get('collector_level') >= 2

  isLoggedIn: ->
    @__isLoggedIn__

  isWithAnonymousSession: ->
    @id? and not @isLoggedIn()

  @instantiate: (attributes = {}) ->
    CurrentUser = require './current_user.coffee'
    LoggedOutUser = require './logged_out_user.coffee'

    CurrentUser.orNull() or
    new LoggedOutUser attributes
