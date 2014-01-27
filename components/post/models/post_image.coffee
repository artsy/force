_        = require 'underscore'
Backbone = require 'backbone'
Artwork  = require('../../../models/artwork.coffee')
Image    = require '../../../models/mixins/image.coffee'
ImageSizes = require '../../../models/mixins/image_sizes.coffee'

module.exports = class PostImage extends Backbone.Model
  _.extend @prototype, Image
  _.extend @prototype, ImageSizes

  artwork: ->
    if @get('artwork')
      new Artwork(@get('artwork'))
    else
      new Artwork(@attributes)
