_ = require 'underscore'
Backbone = require 'backbone'
{ Image } = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data
ImageSizes = require './mixins/image_sizes.coffee'

module.exports = class Suggestion extends Backbone.Model
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes
