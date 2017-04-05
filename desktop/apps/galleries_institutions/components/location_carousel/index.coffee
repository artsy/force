_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
Partners = require '../../../../collections/partners'
metaphysics = require '../../../../../lib/metaphysics'
partnerTypes = require '../../queries/partner_types'
query = require '../../queries/location_carousel_query'
mergeBuckets = require '../partner_cell_carousel/merge_buckets'

module.exports = (type) ->

  Q.promise (resolve, reject) ->
    $.get '/geo/nearest', ({ name, latitude, longitude, slug }) ->
      typeName = if type is 'gallery' then 'Galleries' else 'Institutions'
      category = { name: "Featured #{typeName} near #{name}", id: slug, facet: 'location' }
      metaphysics(
        query: query
        variables: _.extend near: "#{latitude},#{longitude}", type: partnerTypes[type]
      ).then (data) ->
        resolve _.extend category,
          partners: mergeBuckets data.primary, data.secondary
      .catch reject
      .done()
