PartnerFilterFacet = require './partner_filter_facet.coffee'
{ CATEGORIES } = require('sharify').data
{ FeaturedCities } = require 'places'
_ = require 'underscore'
facetDefaults = require './facet_defaults.coffee'

module.exports = ({params, aggregations}) -> [
  new PartnerFilterFacet(_.extend {
      items: _.map(FeaturedCities, ({slug, name}) -> id: slug, name: name),
      params: params,
      aggregations: aggregations
    }, _.find facetDefaults, facetName: 'location'
  ),
  new PartnerFilterFacet(_.extend {
      items: CATEGORIES,
      params: params,
      aggregations: aggregations
    }, _.find facetDefaults, facetName: 'category'
  )]
