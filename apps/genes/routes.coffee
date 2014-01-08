_        = require 'underscore'
sd       = require('sharify').data
Backbone = require 'backbone'
Genes = require '../../collections/genes'

@index = (req, res) ->
  genes = new Genes([], { models: [] })
  options =
    data:
      size: 100
      published: true
      sort: "name"
    url: "#{sd.ARTSY_URL}/api/v1/genes"
    cache: true
    success: ->
      aToZGroup = genes.groupByAlphaWithColumns 3
      res.render 'template',
        aToZGroup   : aToZGroup
        partnerCount: genes.length
  genes.fetchUntilEnd options
