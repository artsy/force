{ FEATURE, TAB } = require('sharify').data
Feature = require '../../../models/feature'
FeatureView = require './view'

module.exports.init = ->
  feature = new Feature FEATURE

  new FeatureView el: $('#feature'), model: feature, tab: TAB
