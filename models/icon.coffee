Backbone = require 'backbone'
sd = require('sharify').data
Icon = require './icon.coffee'

module.exports = class Icon extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/#{@profileId}/icon"

  hasImage: (version = 'circle') ->
    version in (@get('versions') || [])

  imageUrl: (version = 'circle') ->
    @get('image_url').replace(':version', version).replace(".jpg", ".png")
