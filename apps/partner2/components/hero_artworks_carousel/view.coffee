_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'
initCarousel = require '../../../../components/merry_go_round/bottom_nav_mgr.coffee'
template = -> require('./index.jade') arguments...

module.exports = class HeroArtworksCarousel extends Backbone.View

  defaults:
    filterOptions:
      sort: '-partner_updated_at'
      for_sale: true
      size: 10

  initialize: (options = {}) ->
    { @partner, @filterOptions } = _.defaults options, @defaults

  startUp: ->
    @fetchArtworks().then(@initCarousel).done()

  fetchArtworks: ->
    artworks = new FilterArtworks []
    data = _.extend {}, @filterOptions, partner_id: @partner.get('id')
    Q(artworks.fetch data: data).then -> artworks

  initCarousel: (artworks) =>
    return @remove() unless artworks.length >= 5

    @$el.html template artworks: artworks
    initCarousel @$el, wrapAround: true, imagesLoaded: true, (carousel) ->
      carousel.cells.flickity.resize()

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super
