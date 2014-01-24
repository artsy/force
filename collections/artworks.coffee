_ = require 'underscore'
Artwork = require '../models/artwork.coffee'
Backbone = require 'backbone'
{ ARTSY_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Artworks extends Backbone.Collection

  _.extend @prototype, Fetch(ARTSY_URL)

  model: Artwork

  # Maps each artwork's images into an array of image { width, height } hashes meant to be
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

  # Groups models in to an array of n arrays where n is the numberOfColumns requested.
  # For a collection of eight artworks
  # [
  #   [artworks.at(0), artworks.at(3), artworks.at(6)]
  #   [artworks.at(1), artworks.at(4), artworks.at(7)]
  #   [artworks.at(2), artworks.at(6)]
  # ]
  #
  # @param {Number} numberOfColumns The number of columns of models to return in an array

  groupByColumnsInOrder: (numberOfColumns = 3) ->
    return [@models] if numberOfColumns < 2
    # Set up the columns to avoid a check in every model pass
    columns = []
    for column in [0..numberOfColumns-1]
      columns[column] = []
    # Put models in each column in order
    column = 0
    for model in @models
      columns[column].push model
      column = column + 1
      if column is numberOfColumns
        column = 0
    columns
