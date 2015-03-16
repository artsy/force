_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'

artworkTable = -> require('./templates/artwork_table.jade') arguments...
artworkRow = -> require('./templates/artwork_row.jade') arguments...

module.exports = class ArtworkTableView extends Backbone.View
  seeMore: false
  initialItemCount: 10

  initialize: (options)->
    _.extend @, options

    @seeMore = (@seeMore and @collectionLength > @initialItemCount)
    unless @collectionLength
      @collectionLength = @collection.length

    @render()

  buttonLabel: ->
    num = @collectionLength - @initialItemCount
    stem = if num > 1 then 's' else ''
    "See #{num} More Artwork#{stem}"

  length: ->
    @collection.length

  render: ->
    @$el.html artworkTable
      buttonLabel: @buttonLabel()
      seeMore: @seeMore

    @appendArtworks @collection.models

  appendArtworks: (artworks) =>
    for artwork in artworks
      @appendArtworkRow artwork

  appendArtworkRow: (artwork) ->
    renderedArtwork = artworkRow
      artwork: artwork
    $renderedArtwork = $(renderedArtwork)
    @$('#artwork-table').append $renderedArtwork
    $renderedArtwork
