_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
DeepZoom = require '../components/deep_zoom/mixin.coffee'

module.exports = class Image extends Backbone.Model
  _.extend @prototype, DeepZoom(sd.SECURE_IMAGES_URL)

  imageUrl: (version = 'small') ->
      @get('image_url').replace(':version', version) if @has('image_url')
