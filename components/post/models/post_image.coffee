_ = require 'underscore'
Backbone = require 'backbone'
Artwork = require('../../../models/artwork.coffee')
{ Image } = require 'artsy-backbone-mixins'
ImageSizes = require '../../../models/mixins/image_sizes.coffee'
{ SECURE_IMAGES_URL } = require('sharify').data

module.exports = class PostImage extends Backbone.Model
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes

  artwork: ->
    if @get('artwork')
      new Artwork(@get('artwork'))
    else
      new Artwork(@attributes)
