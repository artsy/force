_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Gene = require '../models/gene'
{ API_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Genes extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(API_URL)

  model: Gene

  url: "#{sd.API_URL}/api/v1/genes"

  groupByFamily: ->
    grouped = @groupBy (g) -> g.familyName()
    for familyName, genes of grouped
      {
        name: familyName
        genes: _.sortBy genes, (g) -> g.get('name')
      }

