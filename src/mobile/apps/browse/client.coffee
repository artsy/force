sd = require('sharify').data
bootstrap = require '../../components/layout/bootstrap.coffee'
{ setupFilter } = require '../../components/filter2/index.coffee'
aggregationParams = require './aggregations'

module.exports.init = ->
  bootstrap()
  setupFilter
    el: $ '#browse-page-content--inner'
    aggregations: aggregationParams
