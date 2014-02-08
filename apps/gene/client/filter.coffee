#
# TODO: Refactor the fetch/reset things more into the model layer.
#

_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
FilterArtworksNav = require '../../../components/filter/artworks_nav/view.coffee'
{ ARTSY_URL } = require('sharify').data
mediator = require '../../../components/filter/mediator.coffee'
artworktemTemplate = -> require('../../../components/artwork_item/template.jade') arguments...

module.exports = class GeneFilter extends Backbone.View

  initialize: ->
    @$window = $(window)
    @artworks = new Artworks
    @params = {}
    @filterNav = new FilterArtworksNav el: $ '#gene-filter-artworks-nav'
    @artworks.url = "#{ARTSY_URL}/api/v1/search/filtered/gene/#{@model.get 'id'}"
    @artworks.on 'sync', @render
    @artworks.on 'request', @showSpinner
    @artworks.fetch()
    @bindMediatorEvents()
    @$el.infiniteScroll @nextPage

  bindMediatorEvents: ->
    mediator.on 'filter:price', (range) =>
      @reset { data: 'price_range': range }

  showSpinner: =>
    @$('#gene-filter-artwork-list-spinner').show()

  render: =>
    @$('#gene-filter-artwork-list-spinner').hide()
    @$('#gene-filter-artwork-list').show().html(
      if @artworks.length
        @artworks.map((artwork) ->
          artworktemTemplate artwork: artwork, artworkSize: 'large'
        ).join ''
      else
        '<em class="filter-artwork-columns-no-works">
          No Artworks are available within your selection.
        </em>'
    )

  nextPage: =>
    @params.page = @params.page + 1 or 2
    @artworks.fetch(data: @params, remove: false)

  reset: (@params) ->
    @$('#gene-filter-artwork-list').hide()
    @artworks.fetch(data: @params)