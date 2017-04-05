_ = require 'underscore'
_s = require 'underscore.string'
Artwork = require '../models/artwork'
Backbone = require 'backbone'
SaleArtwork = require '../models/sale_artwork'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Artworks extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: Artwork

  initialize: (models, options = {}) ->
    { @artworkCollection } = options
    @on 'sync', (a, b, jqXHR) => @totalCount = jqXHR?.xhr?.getResponseHeader('X-Total-Count')

  # Maps each artwork's images into an array of image { width, height } hashes meant to be
  # passed into fillwidth.
  #
  # @param {Number} maxHeight The max height the image can be

  fillwidthDimensions: (maxHeight) ->
    imageWidths = @map (artwork) ->
      return null unless image = artwork.defaultImage()
      width = Math.round maxHeight * image.get('aspect_ratio')
      height = if width < maxHeight then maxHeight else width / image.get('aspect_ratio')
      { width: width, height: height }
    _.without imageWidths, null

  # Groups models in to an array of n arrays where n is the numberOfColumns requested.
  # For a collection of eight artworks
  # [
  #   [artworks.at(0), artworks.at(3), artworks.at(6)]
  #   [artworks.at(1), artworks.at(4), artworks.at(7)]
  #   [artworks.at(2), artworks.at(5)]
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

  # Pass in sale_artworks and this will flip it into a collection of artworks with sale info
  # injected into it. Useful for reusing views meant for artworks that have a little bit of
  # sales info along-side such as the artwork_columns component.
  #
  # @param {Collection} saleArtworks Backbone Collection from `/api/v1/sale/:id/sale_artworks`
  # @return The new artworks collection

  @__fromSale__: (saleArtworks) ->
    saleArtworks.map (saleArtwork) ->
      _.extend saleArtwork.get('artwork'),
        sale_artwork: saleArtwork.omit('artwork')

  @fromSale: (saleArtworks) ->
    new Artworks @__fromSale__(saleArtworks)

  hasAny: (attr) ->
    _.any _.map(@pluck(attr), _.negate(_.isEmpty))

  maxBlurbHeight: (displayBlurbs, lineHeight = 25.5, columnWidth = 50) ->
    return unless displayBlurbs

    Math.ceil(_.max(_.map @pluck('blurb'), (blurb) ->
      ((_s.stripTags(blurb).length / columnWidth) * lineHeight) + lineHeight
    )) + 'px'
