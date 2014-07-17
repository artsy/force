_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Genes = require '../../collections/genes.coffee'
Gene = require '../../models/gene.coffee'
genesTemplate = -> require('./templates/template.jade') arguments...

module.exports = class RelatedGenesView extends Backbone.View

  initialize: (options) ->
    { @model, @modelName } = options
    # Artist's related genes uses the related search API
    if @modelName is 'artist'
      @title = 'Related Categories'
      @fetchThenRenderRelatedGenes()
    # Gene's related genes are _actually_ suggested genes from filter search
    else if @modelName is 'gene'
      @title = 'Related Categories'
      @fetchThenRenderRelatedFilterGenes()

  fetchThenRenderRelatedFilterGenes: ->
    genes = new Genes
    model = new Backbone.Model
    model.url = "#{sd.API_URL}/api/v1/search/filtered/#{@modelName}/#{@model.id}/options"
    model.fetch
      success: (categories) =>
        geneMap = categories.get('related_genes')
        for geneName, geneSlug of geneMap
          genes.add new Gene id: geneSlug, name: geneName
        @render _.first genes.models, 10

  fetchThenRenderRelatedGenes: ->
    genes = new Genes
    genes.url = "#{sd.API_URL}/api/v1/related/genes?#{@modelName}[]=#{@model.id}"
    genes.fetch
      success: (collection) =>
        return unless collection.length > 0
        @render _.first collection.models, 10

  render: (relatedGenes) =>
    @$el.
      html(genesTemplate(genes: relatedGenes, title: @title)).
      addClass('is-fade-in')
