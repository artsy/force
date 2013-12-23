Backbone = require 'backbone'
_        = require 'underscore'
sd       = require('sharify').data
Icon     = require './icon.coffee'
Image    = require './mixins/image.coffee'

module.exports = class Icon extends Backbone.Model

  _.extend @prototype, Image

  urlRoot: "#{sd.ARTSY_URL}/api/v1/#{@profileId}/icon"

  imageUrl: (version = 'circle') ->
    @fullyQualifiedImageUrl @get('image_url').replace(':version', version).replace(".jpg", ".png")
