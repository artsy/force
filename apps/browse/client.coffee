scrollFrame = require 'scroll-frame'
{ setupFilter } = require '../../components/filter2/index.coffee'
aggregationParams = require './aggregations.coffee'
sd = require('sharify').data

module.exports.init = ->
  setupFilter
    filterRoot: '/browse/artworks'
    el: $ '#browse-filter'
    aggregations: aggregationParams

  scrollFrame '#browse-filter a' unless sd.EIGEN
