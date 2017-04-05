sd = require('sharify').data
bootstrap = require '../../../components/layout/bootstrap'
{ setupFilter } = require '../../../components/filter2/index'
aggregationParams = require '../aggregations'
Fair = require '../../../models/fair'

module.exports.init = ->
  bootstrap()
  fair = new Fair(sd.FAIR)
  setupFilter
    el: $('#fair-artworks-page-content--inner')
    aggregations: aggregationParams
    stuckFacet: fair
    stuckParam: 'fair_id'
