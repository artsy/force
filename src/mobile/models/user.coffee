Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class User extends Backbone.Model

  urlRoot: -> "#{sd.API_URL}/api/v1/user"
