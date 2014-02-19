_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'

Artworks            = require '../../../collections/artworks.coffee'
LayeredSearchView   = require('./layered-search.coffee').LayeredSearchView
SaleView            = require './sale.coffee'

module.exports = class BelowTheFold extends Backbone.View
  initialize: (options) ->
    { @saved, @artwork } = options

    $.when.apply(null, @artwork.fetchRelatedCollections()).then =>
      # Find the first related collection that has any results
      availableFeature = _.find @artwork.relatedCollections, (xs) -> xs.length
      if availableFeature
        @["setup#{availableFeature.kind}"]()
      else
        # Always fallback to layered search if there are no features available
        @setupLayeredSearch()

  setupLayeredSearch: ->
    new LayeredSearchView el: @$el, artwork: @artwork
    @done()

  setupSales: ->
    new SaleView el: @$el, sale: @artwork.sales.first(), saved: @saved
    @done()

  setupFairs: ->
    throw 'I don\'t know how to do this yet!'

  setupShows: ->
    throw 'I don\'t know how to do this yet!'

  done: ->
    @$el.attr 'data-state', 'fade-in'
