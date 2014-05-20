_         = require 'underscore'
Backbone  = require 'backbone'
Geo       = require './mixins/geo.coffee'

# Base User model for shared functionality between
# CurrentUser and LoggedOutUser
module.exports = class User extends Backbone.Model
  _.extend @prototype, Geo

  refresh: (options = {}) ->
    @fetch _.extend(url: '/user/refresh', options)
