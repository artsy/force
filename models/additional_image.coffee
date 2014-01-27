_         = require 'underscore'
Backbone  = require 'backbone'
Image     = require './mixins/image.coffee'
ImageSizes = require './mixins/image_sizes.coffee'

module.exports = class AdditionalImage extends Backbone.Model

  _.extend @prototype, Image
  _.extend @prototype, ImageSizes
