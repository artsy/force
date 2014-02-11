{ ARTSY_URL } = require('sharify').data
_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
mediator = require '../../../components/filter/mediator.coffee'
FilterArtworksNav = require '../../../components/filter/artworks_nav/view.coffee'
FilterSortCount = require '../../../components/filter/sort_count/view.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'

module.exports = class GeneFilter extends Backbone.View

  initialize: ->
    @params = {}
    @$window = $(window)
    @artworks = new Artworks
    @artworks.url = "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
    @filterNav = new FilterArtworksNav el: $ '#gene-filter-artworks-nav'
    @sortCount = new FilterSortCount el: $ '#gene-filter-sort-count'
    @columnsView = new ArtworkColumnsView
      el: @$ '#gene-artwork-list'
      collection: @artworks
      totalWidth: @$el.width()
      artworkSize: 'large'
      numberOfColumns: Math.round @$el.width() / 300
      gutterWidth: 40
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
    return unless @$el.data('state') is 'artworks'
    @params.page = @params.page + 1 or 2
    @artworks.fetch(data: @params, remove: false)

  reset: (@params = {}) =>
    @$el.attr 'data-state', 'artworks'
    @$('#gene-filter-all-artists').removeClass 'is-active'
    @$('#gene-artwork-list').html ''
    @artworks.fetch(data: @params)
    @model.fetchFilterSuggest @params, success: (m, res) ->
      mediator.trigger 'counts', "Showing #{res.total} Works"

  events:
    'click #gene-filter-all-artists': 'toggleArtistMode'

  toggleArtistMode: ->
    @$el.attr 'data-state', ''
    @$('#gene-filter-all-artists').addClass 'is-active'
    @$('#gene-filter-artworks-nav .is-active').removeClass 'is-active'