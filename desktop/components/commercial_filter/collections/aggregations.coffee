Backbone = require 'backbone'
Aggregation = require '../models/aggregation.coffee'

module.exports = class Aggregations extends Backbone.Collection
  model: Aggregation

