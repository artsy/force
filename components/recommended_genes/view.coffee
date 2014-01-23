_              = require 'underscore'
Backbone       = require 'backbone'
sd             = require('sharify').data
Genes          = require '../../collections/genes.coffee'
OrderedSets    = require '../../collections/ordered_sets.coffee'
template       = -> require('./template.jade') arguments...

module.exports = class RecommendedGenes extends Backbone.View
  
  defaults:
    numberOfItems: 5
    isShuffle: true

  initialize: (options) ->
    { @numberOfItems, @isShuffle } = _.defaults options or {}, @defaults
    @collection = new Genes()
    @listenTo @collection, 'request', @renderLoading
    @listenTo @collection, 'sync', @render
    @fetchRecommendedGenes()
    @

  renderLoading: ->
    @$el.find('.recommendations').html '<div class="loading-spinner"></div>'

  render: ->
    genes = if @isShuffle then _.shuffle @collection.models else @collection.models
    @$el.html template genes: genes.slice(0, @numberOfItems)
    @

  fetchRecommendedGenes: (options) ->
    (new OrderedSets key: 'favorites:suggested-genes').fetch
      success: (geneSets) =>
        @fetchRandomGenes options unless (setId = geneSets.first()?.get 'id')
        url = "#{sd.ARTSY_URL}/api/v1/set/#{setId}/items"
        data = size: @numberOfItems * 2
        @collection.fetch(_.extend { url: url, data: data }, options)

  fetchRandomGenes: (options) ->
    data =
      size: @numberOfItems
      page: Math.floor Math.random() * 100 + 1 # random page number in range (1, 100)
      published: true
      sort: "counts.artists"
    @collection.fetch(_.extend { data: data, cache: true }, options)
