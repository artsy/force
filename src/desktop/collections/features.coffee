Backbone = require 'backbone'
Feature = require '../models/feature.coffee'

module.exports = class Features extends Backbone.Collection
  model: Feature
