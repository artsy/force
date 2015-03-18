_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
analytics = require '../../lib/analytics.coffee'
ArtworkRowView = require './client/artwork_row_view.coffee'

artworkTable = -> require('./templates/artwork_table.jade') arguments...

module.exports = class ArtworkTableView extends Backbone.View
  initialItemCount: 10

  initialize: (options)->
    _.extend @, options

    @seeMore = (@seeMore and @collectionLength > @initialItemCount)
    unless @collectionLength
      @collectionLength = @collection.length

    @render()

  length: ->
    @$('.artwork-table__row').length

  render: ->
    @$el.html artworkTable()
    @appendArtworks @collection.models

  appendArtworks: (artworks) =>
    for artwork in artworks
      @appendArtworkRow artwork

  appendArtworkRow: (artwork) ->
    new ArtworkRowView
      model: artwork
      $container: @$('#artwork-table')
