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
    @artworks.on 'sync', @render
    mediator.on 'filter', @reset
    @$el.infiniteScroll @nextPage

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

  reset: (@params) =>
    @$('#gene-filter').attr 'data-state', 'artworks'
    @$('#gene-filter-all-artists').removeClass 'is-active'
    @$('#gene-artwork-list').html ''
    @columnsView ?= new ArtworkColumnsView
      el: @$ '#gene-artwork-list'
      collection: @artworks
      totalWidth: @$('#gene-artwork-list').width()
      artworkSize: 'large'
      numberOfColumns: Math.round @$('#gene-artwork-list').width() / 300
      gutterWidth: 40
    @artworks.fetch(data: @params)

  events:
    'click #gene-filter-all-artists': 'toggleArtistMode'

  toggleArtistMode: ->
    @$('#gene-filter').attr 'data-state', ''
    @$('#gene-filter-all-artists').addClass 'is-active'
    @$('#gene-filter-artworks-nav .is-active').removeClass 'is-active'