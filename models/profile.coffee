sd = require('sharify').data
Backbone = require 'backbone'
Icon = require './icon.coffee'
CoverImage = require './cover_image.coffee'

module.exports = class Profile extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/profile"

  icon: ->
    new Icon @get('icon'), profileId: @get('id')

  displayName: ->
  	@get('owner')?.name

  coverImage: ->
    new CoverImage @get('cover_image'), profileId: @get('id')
