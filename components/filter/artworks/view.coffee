_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
mediator = require '../mediator.coffee'
FilterSortCount = require '../sort_count/view.coffee'
ArtworkColumnsView = require '../../artwork_columns/view.coffee'
template = -> require('./template.jade') arguments...

COLUMN_WIDTH = 300

module.exports = class FilterArtworksView extends Backbone.View

  pageSize: 10

  initialize: (options) ->
    @params = {}
    @$window = $(window)
    @artworks = new Artworks
    @artworks.url = options.url
    @sortCount = new FilterSortCount el: $('.filter-sort-count')
    @artworks.on 'sync', @render
    mediator.on 'filter', @reset
    @$el.infiniteScroll @nextPage

  render: (c, res) =>
    @$('.filter-artworks-list-container').attr 'data-state',
      if @artworks.length is 0 then 'no-results'
      else if res.length < @pageSize then 'finished-paging'
      else ''
    @newColumnsView() unless @columnsView?
    @columnsView.appendArtworks(new Artworks(res).models)

  nextPage: =>
    return unless @$el.is ':visible'
    @params.page = @params.page + 1 or 2
    @artworks.fetch(data: @params, remove: false)

  reset: (@params = {}) =>
    @$('.filter-artworks-list').html ''
    @artworks.fetch(data: @params)
    _.defer @newColumnsView

  newColumnsView: =>
    @columnsView?.remove()
    @$('.filter-artworks-list').html $el = $("<div></div>")
    @columnsView = new ArtworkColumnsView
      el: $el
      collection: new Artworks
      artworkSize: 'large'
      numberOfColumns: Math.round $el.width() / COLUMN_WIDTH
      gutterWidth: 40