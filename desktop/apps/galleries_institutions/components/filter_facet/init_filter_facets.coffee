PartnerFilterFacet = require './partner_filter_facet'
{ CATEGORIES } = require('sharify').data
{ Cities, FeaturedCities } = require '../../../../components/partner_cities/index'
locationSynonyms = require './locationSynonyms'

_ = require 'underscore'
facetDefaults = require './facet_defaults'

module.exports = ({params, aggregations}) -> [
  new PartnerFilterFacet(_.extend {
      allItems: _.map(Cities, ({slug, name}) -> id: slug, name: name)
      emptyStateItemIDs: _.pluck FeaturedCities, 'slug'
      params: params
      aggregations: aggregations
      synonyms: locationSynonyms
    }, _.find facetDefaults(params.get('type')), facetName: 'location'
  ),
  new PartnerFilterFacet(_.extend {
      allItems: CATEGORIES
      params: params
      aggregations: aggregations
    }, _.find facetDefaults(params.get('type')), facetName: 'category'
  ),
  new PartnerFilterFacet(_.extend {
      allItems: [],
      params: params,
      aggregations: aggregations,
    }, _.find facetDefaults(params.get('type')), facetName: 'term'
  )
]
