sd = require('sharify').data
Feature = require '../../../models/feature.coffee'
FeatureView = require './view.coffee'

module.exports.init = ->
  feature = new Feature(sd.FEATURE)
  new FeatureView el: $('#feature'), model: feature, tab: sd.TAB
  require('./analytics.coffee')(feature)
