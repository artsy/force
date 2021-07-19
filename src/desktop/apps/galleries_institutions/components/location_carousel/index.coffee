_ = require 'underscore'
metaphysics = require '../../../../../lib/metaphysics2.coffee'
partnerTypes = require '../../queries/partner_types'
query = require '../../queries/location_carousel_query.coffee'
mergeBuckets = require '../partner_cell_carousel/merge_buckets.coffee'
require '../../../../../lib/promiseDone'

module.exports = (type) ->
  new Promise (resolve, reject) ->
    $.get '/geo/nearest', ({ name, latitude, longitude, slug }) ->
      typeName = if type is 'gallery' then 'Galleries' else 'Institutions'
      category = { name: "Featured #{typeName} near #{name}", id: slug, facet: 'location' }
      metaphysics(
        query: query
        variables: _.extend near: "#{latitude},#{longitude}", type: partnerTypes[type]
      ).then (data) ->
        resolve _.extend category,
          partners: mergeBuckets data.primary.hits, data.secondary.hits
      .catch reject
      .done()
