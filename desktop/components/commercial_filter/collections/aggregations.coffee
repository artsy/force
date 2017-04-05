Backbone = require 'backbone'
Aggregation = require '../models/aggregation'

module.exports = class Aggregations extends Backbone.Collection
  model: Aggregation

