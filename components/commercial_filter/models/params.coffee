_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class Params extends Backbone.Model
  urlWhitelist:[
    'page'
    'medium'
    'color',
    'price_range',
    'width',
    'height',
    'gene_id'
  ]
  defaults:
    size: 25
    page: 1
    for_sale: true
    color: null
    medium: null
    aggregations: ['TOTAL', 'COLOR', 'MEDIUM']
    ranges:
      price_range:
        min: 50.00
        max: 50000.00
      width:
        min: 1
        max: 120
      height:
        min: 1
        max: 120

  initialize: (attributes, { @categoryMap }) ->
    # no op

  current: ->
    categories = @categoryMap[@get('medium') || 'global']
    extra_aggregation_gene_ids = _.pluck categories, 'id'
    _.extend @attributes, extra_aggregation_gene_ids: extra_aggregation_gene_ids

  whitelisted: ->
    whitelisted = _.pick @current(), @urlWhitelist
    omitted = _.omit whitelisted, (val, key) ->
      (key is 'page' and val is 1) or
      not val?
