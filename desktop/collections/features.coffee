Backbone = require 'backbone'
Feature = require '../models/feature'

module.exports = class Features extends Backbone.Collection
  model: Feature
