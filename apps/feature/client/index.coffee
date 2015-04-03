Backbone = require 'backbone'
{ FEATURE, TAB } = require('sharify').data
Feature = require '../../../models/feature.coffee'
FeatureView = require './view.coffee'
FeatureRouter = require './router.coffee'

module.exports.init = ->
  feature = new Feature FEATURE

  new FeatureView el: $('#feature'), model: feature, tab: TAB
  new FeatureRouter feature: feature

  Backbone.history.start pushState: true

  require('./analytics.coffee')(feature)
