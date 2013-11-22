Backbone = require 'backbone'
_ = require 'underscore'
Artwork = require '../models/artwork.coffee'

module.exports = class Artworks extends Backbone.Collection

  model: Artwork

  # Maps each artwork's images into an array of image [width, height] pairs meant to be
  # passed into fillwidth.
  #
  # @param {Number} maxHeight The max height the image can be

  fillwidthDimensions: (maxHeight) ->
    imageWidths = @map (artwork) ->
      return null unless image = artwork.get('images')[0]
      width = Math.round maxHeight * image.aspect_ratio
      height = if width < maxHeight then maxHeight else width / image.aspect_ratio
      { width: width, height: height }
    _.without imageWidths, null