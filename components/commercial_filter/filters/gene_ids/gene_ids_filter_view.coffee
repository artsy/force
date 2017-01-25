_ = require 'underscore'
Backbone = require 'backbone'
mediumMap = require './../medium/medium_map.coffee'
{ numberFormat } = require 'underscore.string'

template = -> require('./index.jade') arguments...

module.exports = class GeneIdsFilterView extends Backbone.View
  className: 'cf-genes cf-filter'
  events:
    "change [type='checkbox']" : 'toggleGene'

  initialize: ({ @params, @aggregations, @checkbox = false }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aggregations collection' unless @aggregations?

    @listenTo @params, 'change:gene_ids', @render
    @listenTo @aggregations, 'reset', @render

  resolveGenes: (selectedGene) ->
    if selectedGene is 'genes-all'
      []
    else if _.contains(@params.get('gene_ids'), selectedGene)
      _.without(@params.get('gene_ids'), selectedGene)
    else
      @params.get('gene_ids').concat selectedGene

  toggleGene: (e) ->
    selectedGene = $(e.currentTarget).attr('id')
    @params.set page: 1, silent: true, gene_ids: @resolveGenes(selectedGene)

  hasResults: (counts, id) ->
    _.any counts, (count) -> count.id is id

  findAggregation: (counts, id) ->
    _.find counts, (count) -> count.id is id

  render: ->
    @$el.html template
      counts: @aggregations.get('MEDIUM')?.get('counts')
      gene_ids: mediumMap
      selected: @params.get('gene_ids')
      hasResults: @hasResults
      findAggregation: @findAggregation
      numberFormat: numberFormat
