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
    size: 18
    page: 1
    for_sale: true
    color: null
    medium: null
    aggregations: ['TOTAL', 'COLOR', 'MEDIUM']

  current: ->
    @attributes

  whitelisted: ->
    whitelisted = _.pick @current(), @urlWhitelist
    omitted = _.omit whitelisted, (val, key) ->
      (key is 'page' and val is 1) or
      (key is 'price_range' and val is '0.00-50000.00') or
      not val?
