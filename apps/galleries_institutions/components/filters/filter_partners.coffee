Backbone = require 'backbone'
_ = require 'underscore'
metaphysics = require '../../../../lib/metaphysics.coffee'
partnerTypes = require '../../queries/partner_types.coffee'
query = require '../../queries/partners_filter_query.coffee'
facetDefaults = require './facet_defaults.coffee'

{ FeaturedCities } = require 'places'

module.exports = class FilterPartners extends Backbone.Model

  initialize: ({ @params }) ->
    _.each _.pluck(facetDefaults, 'facetName'), (f) =>
      @listenTo @params, "change:#{f}", @reset
    @page = 1
    @partners = []
    @aggregations = new Backbone.Model
    @total = 0

  fetch: =>
    return if @allFetched or @fetching
    @fetching = true
    paramsJSON = @params.toJSON()
    data = _.extend _.pick(paramsJSON, 'category'), type: partnerTypes[paramsJSON.type]
    city = _.findWhere FeaturedCities, slug: paramsJSON.location if paramsJSON.location
    data.near = city.coords.join (',') if city

    data.page = @page
    data.includeAggregations = includeAggregations = @page == 1
    data.includeResults = includeResults = @params.hasSelection()

    metaphysics
      query: query
      variables: data
    .then (response) =>
      if includeAggregations && includeResults
        @total = response.results.total

      if includeAggregations
        _.each _.omit(response, 'results'), (aggregationFacet, facetName) =>
          @aggregations.set facetName,
            total: aggregationFacet.total,
            countItems: aggregationFacet.aggregations[0].counts

      if includeResults
        newPartners = response.results.hits
        Array.prototype.push.apply @partners, response.results.hits

      @allFetched = @partners.length >= @total
      @trigger 'add', newPartners

      @fetching = false
      @page++

  reset: =>
    @partners = []
    @allFetched = false
    @page = 1
    @total = 0
    @aggregations.unset()
    @trigger 'reset', this