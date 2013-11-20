Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class Artwork extends Backbone.Model
  
  urlRoot: -> "#{sd.GRAVITY_URL}/api/v1/artwork"

  defaultImageUrl: (version = 'medium') ->
    @get('images')?[0]?.image_url.replace(':version', version) ? ''