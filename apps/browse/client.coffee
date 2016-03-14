_ = require 'underscore'
scrollFrame = require 'scroll-frame'
{ setupFilter } = require '../../components/filter2/index.coffee'
aggregationParams = require './aggregations.coffee'
sd = require('sharify').data

module.exports.init = ->
  { params } = setupFilter
    filterRoot: '/browse/artworks'
    el: $ '#browse-filter'
    aggregations: aggregationParams

  scrollFrame '#browse-filter a' unless sd.EIGEN

  params.on 'change:for_sale change:price_range change:dimension_range change:medium', ->
    analytics.track 'Commericial filter: params changed',
      current: _.omit params.attributes, 'aggregations'
      changed: _.omit params.changedAttributes(), 'aggregations'
