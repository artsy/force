sd = require('sharify').data
Feature = require '../../../models/feature.coffee'
FeatureView = require './view.coffee'

module.exports.init = ->
  new FeatureView
    el: $('#feature')
    model: new Feature sd.FEATURE
    tab: sd.TAB
