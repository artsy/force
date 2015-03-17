{ FEATURE } = require('sharify').data
Feature = require '../../../models/feature.coffee'
FeatureView = require './view.coffee'

module.exports.init = ->
  feature = new Feature FEATURE
  new FeatureView el: $('#feature'), model: feature
  require('./analytics.coffee')(feature)
