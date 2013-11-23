Backbone = require 'backbone'
sd = require('sharify').data
Profile = require('./profile.coffee')

module.exports = class Post extends Backbone.Model
  
  urlRoot: "#{sd.GRAVITY_URL}/api/v1/post"

  profile: ->
    new Profile @get('profile')