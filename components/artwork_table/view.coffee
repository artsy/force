_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
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

  appendArtworks: (artworks) ->
    @render()

  render: ->
    @$el.html artworkTable()
    rows = @rowHtml(@collection)
    @$('#artwork-table').html rows

  rowHtml: (coll) ->
    coll.map (artwork) ->
      view = new ArtworkRowView model: artwork
      view.render().$el
