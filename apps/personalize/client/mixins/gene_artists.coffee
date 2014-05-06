_               = require 'underscore'
Backbone        = require 'backbone'
Genes           = require '../../../../collections/genes.coffee'
{ Following }   = require '../../../../components/follow_button/index.coffee'
priceBuckets    = require '../mixins/price_buckets.coffee'

module.exports =
  initializeGeneArtists: ->
    @geneFollowing = new Following null, kind: 'gene'
    @geneFollowing.fetch
      data: size: 5
      success: (collection, response, options) =>
        @setupGenes collection

  setupGenes: (collection) ->
    @genes = new Genes collection.pluck('gene')
    $.when.apply(null, @genes.map (gene) =>
      gene.trendingArtists.fetch
        data: size: 5
    ).then =>
      @renderGeneSuggestions()

  renderGeneSuggestions: ->
    @genes.each (gene) =>
      @suggestions.add @createGeneSuggestionSet gene
    @renderSuggestions()

  createGeneSuggestionSet: (gene) ->
    new Backbone.Model
      id          : gene.id
      name        : "Suggested for you in #{gene.get 'name'}"
      suggestions : gene.trendingArtists
