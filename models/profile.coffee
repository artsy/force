Backbone = require 'backbone'
sd = require('sharify').data
Icon = require './icon.coffee'

module.exports = class Profile extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/profile"

  icon: ->
    new Icon @get('icon'), profileId: @get('id')

  displayName: ->
  	@get('owner')?.name