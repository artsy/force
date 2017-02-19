Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class Video extends Backbone.Model

  defaultSize: 'large_rectangle'

  urlRoot: -> "#{sd.API_URL}/api/v1/video"

  posterUrl: (size) ->
    if @hasImage(size)
      @imageUrl size
    else
      @imageUrl()

  hasImage: (size = @defaultSize) ->
    size in (@get('image_versions') || [])

  imageUrl: (size = @defaultSize) ->
    @get('image_url')?.replace(':version', size)
