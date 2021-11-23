{ bootstrap } = require '../../../components/layout/bootstrap'
sd = require('sharify').data
Backbone = require 'backbone'
{ Artworks } = require '../../../collections/artworks'
artworkColumnsTemplate = -> require('../../../components/artwork_columns/template.jade') arguments...

module.exports.PartnerArtworksView = class PartnerArtworksView extends Backbone.View

  initialize: (options) ->
    @params = options.params
    @collection.on 'sync', @render
    @setupInfiniteScroll()
    @fetching = false

  setupInfiniteScroll: ->
    $.onInfiniteScroll =>
      return if @finishedScrolling or @fetching
      @params.page++
      @$('#partner-artworks-spinner').show()
      @collection.fetch
        data: @params
        success: (artworks, res) =>
          @finishedScrolling = true if res.length is 0
        complete: =>
          @fetching = false
          @$('#partner-artworks-spinner').hide()

  render: =>
    $columns = $(artworkColumnsTemplate(artworkColumns: @collection.groupByColumnsInOrder()))
    @$('#partner-artworks-list .artwork-columns-column').each (i, column) =>
      $(column).append $columns.find('.artwork-columns-column').eq(i).html()
    @$('#partner-artworks-spinner').hide()

module.exports.init = ->
  bootstrap()
  artworks = new Artworks sd.ARTWORKS
  artworks.url = "#{sd.PARTNER_URL}/artworks"
  new PartnerArtworksView
    collection: artworks
    el: $('body')
    params: sd.PARAMS
