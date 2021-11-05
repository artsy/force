{ bootstrap } = require '../../components/layout/bootstrap'
{ setupFilter } = require '../../components/filter2/index'
aggregationParams = require './aggregations'

module.exports.init = ->
  bootstrap()
  setupFilter
    el: $ '#browse-page-content--inner'
    aggregations: aggregationParams
