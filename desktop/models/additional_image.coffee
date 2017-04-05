_ = require 'underscore'
Backbone = require 'backbone'
{ Image } = require 'artsy-backbone-mixins'
ImageSizes = require './mixins/image_sizes'
DeepZoom = require './mixins/deep_zoom'
{ SECURE_IMAGES_URL } = require('sharify').data

module.exports = class AdditionalImage extends Backbone.Model

  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes
  _.extend @prototype, DeepZoom(SECURE_IMAGES_URL)

  isDownloadable: (user) ->
    (@get('downloadable') and @hasImage('larger')) or !!user?.isAdmin()
