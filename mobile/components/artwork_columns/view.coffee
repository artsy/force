_ = require 'underscore'
Backbone = require 'backbone'
artworkColumns = -> require('./template.jade') arguments...
artworkItem = -> require('./artwork.jade') arguments...

module.exports = class ArtworkColumns extends Backbone.View

  initialize: ->
    unless @$('.artwork-columns-column').length > 0
      throw "You must render columns before using this view."

  # Build up columns of artworks, then append to each existing column
  renderArtworks: (artworkColumns) ->
    return if artworkColumns[0].length is 0
    for artworkColumn, index in artworkColumns
      column = []
      size = if artworkColumn.length is 1 then 'large' else 'tall'
      for artwork in artworkColumn
        column.push artworkItem { artwork: artwork, size: size }
      @$(".artwork-columns-column:nth-of-type(#{index + 1})").append column.join ''
