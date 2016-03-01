_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class Params extends Backbone.Model
  urlWhitelist:[
    'page'
    'medium'
    'color',
    'price_range',
    'width',
    'height'
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

  current: ->
    @attributes

  whitelisted: ->
    whitelisted = _.pick @current(), @urlWhitelist
    omitted = _.omit whitelisted, (val, key) ->
      (key is 'page' and val is 1) or
      not val?
