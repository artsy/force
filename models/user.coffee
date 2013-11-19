Backbone  = require 'backbone'
sd        = require('sharify').data

module.exports = class User extends Backbone.Model
  url: "#{sd.GRAVITY_URL}/api/v1/user"
