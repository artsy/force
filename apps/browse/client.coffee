scrollFrame = require 'scroll-frame'
{ setupFilter } = require '../../components/filter2/index.coffee'
aggregationParams = require './aggregations.coffee'

module.exports.init = ->
  setupFilter
    el: $ '#browse-filter'
    aggregations: aggregationParams
  scrollFrame '#browse-filter a'
