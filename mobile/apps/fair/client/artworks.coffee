sd = require('sharify').data
bootstrap = require '../../../components/layout/bootstrap.coffee'
{ setupFilter } = require '../../../components/filter2/index.coffee'
aggregationParams = require '../aggregations.coffee'
Fair = require '../../../models/fair.coffee'

module.exports.init = ->
  bootstrap()
  fair = new Fair(sd.FAIR)
  setupFilter
    el: $('#fair-artworks-page-content--inner')
    aggregations: aggregationParams
    stuckFacet: fair
    stuckParam: 'fair_id'
