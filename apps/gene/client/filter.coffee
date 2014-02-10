#
# TODO: Refactor the fetch/reset things more into the model layer.
#

_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
FilterArtworksNav = require '../../../components/filter/artworks_nav/view.coffee'
{ ARTSY_URL } = require('sharify').data
mediator = require '../../../components/filter/mediator.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'

module.exports = class GeneFilter extends Backbone.View

  initialize: ->
    @$window = $(window)
    @artworks = new Artworks
    @params = {}
    @filterNav = new FilterArtworksNav el: $ '#gene-filter-artworks-nav'
    @artworks.url = "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
    @columnsView = new ArtworkColumnsView
      el: @$ '#gene-artwork-list'
      collection: @artworks
      totalWidth: @$('#gene-artwork-list').width()
      artworkSize: 'large'
      numberOfColumns: Math.round @$('#gene-artwork-list').width() / 300
      gutterWidth: 40
    @artworks.on 'sync', @render
    @artworks.fetch()
    @bindMediatorEvents()
    @$el.infiniteScroll @nextPage

  bindMediatorEvents: ->
    mediator.on 'filter', (params) =>
      @reset params

  render: =>
    @$('#gene-artwork-list-container').attr 'data-state', switch @artworks.length
      when 0 then 'no-results'
      when @lastArtworksLength then 'finished-paging'
      else ''
    @columnsView.render() unless @lastArtworksLength is @artworks.length
    @lastArtworksLength = @artworks.length

  nextPage: =>
    @params.page = @params.page + 1 or 2
    @artworks.fetch(data: @params, remove: false)

  reset: (@params) ->
    @$('#gene-artwork-list').html ''
    @artworks.fetch(data: @params)