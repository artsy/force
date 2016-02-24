PartnerFilterFacet = require './partner_filter_facet.coffee'
{ CATEGORIES } = require('sharify').data
{ Cities, FeaturedCities } = require 'places'
_ = require 'underscore'
facetDefaults = require './facet_defaults.coffee'

module.exports = ({params, aggregations}) -> [
  new PartnerFilterFacet(_.extend {
      allItems: _.map(Cities, ({slug, name}) -> id: slug, name: name)
      emptyStateItemIDs: _.pluck FeaturedCities, 'slug'
      params: params
      aggregations: aggregations
    }, _.find facetDefaults, facetName: 'location'
  ),
  new PartnerFilterFacet(_.extend {
      allItems: CATEGORIES
      params: params
      aggregations: aggregations
    }, _.find facetDefaults, facetName: 'category'
  )]
