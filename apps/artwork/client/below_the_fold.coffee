_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'
LayeredSearchView = require('./layered_search.coffee').LayeredSearchView
SaleView = require './sale.coffee'

module.exports = class BelowTheFold extends Backbone.View
  initialize: ({ @artwork }) ->
    # no-op

  setupRails: ->
    artworks = new FilterArtworks []

    new ArtworkRailView
      collection: artworks
      el: $('#artwork-rails')
      title: "More works by #{@artwork.related().artist.get('name')}"
      viewAllUrl: "/"

    artworks.fetch
      data:
        artist_id: @artwork.related().artist.id
        for_sale: true

  setupSale: (options = {}) ->
    new SaleView _.extend el: @$el, artwork: @artwork, options
    @fadeIn()

  setupFair: (fair) ->
    @setupLayeredSearch fair: fair

  setupLayeredSearch: (options = {}) ->
    new LayeredSearchView el: @$el, artwork: @artwork, fair: options.fair
    @fadeIn()

  fadeIn: ->
    @$el.attr 'data-state', 'fade-in'
