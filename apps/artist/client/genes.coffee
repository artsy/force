_             = require 'underscore'
Backbone      = require 'backbone'
Genes         = require '../../../collections/genes.coffee'
genesTemplate = -> require('../templates/related_genes.jade') arguments...
sd            = require('sharify').data

module.exports = class RelatedGenesView extends Backbone.View

  initialize: (options) ->
    { @model } = options
    @fetchThenRender()

  fetchThenRender: ->
    @genes = new Genes
    @genes.url = "#{sd.ARTSY_URL}/api/v1/related/genes?artist[]=#{@model.id}"
    @genes.fetch
      success: (collection) =>
        return unless collection.length > 0
        @render _.first collection.models, 10

  render: (relatedGenes) =>
    @$el.html genesTemplate(genes: relatedGenes)
