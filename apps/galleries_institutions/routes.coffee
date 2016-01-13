Backbone = require 'backbone'
_ = require 'underscore'
Q = require 'bluebird-q'
qs = require 'qs'
metaphysics = require '../../lib/metaphysics'
{ API_URL } = require('sharify').data
{ FeaturedCities } = require 'places'
mergeBuckets = require './components/partner_cell_carousel/merge_buckets'
fetchPrimaryCarousel = require './components/primary_carousel/fetch'
ViewHelpers = require './components/partner_cell/view_helpers'
query = require './queries/partner_categories_query'
partnerTypes = require './queries/partner_types'

mapType =
  galleries: 'gallery'
  institutions: 'institution'

@index = (req, res, next) ->
  res.locals.sd.PARTNERS_ROOT = req.params.type
  type = mapType[req.params.type]
  searchParams = _.pick(req.query, 'location', 'category')
  params = _.extend type: type, searchParams

  Q.all([
    fetchPrimaryCarousel(params)
    metaphysics(
      query: query
      variables: _.extend category_type: type.toUpperCase(), partnerTypes[type]
    ).then (data) ->
      _.compact _.map data.partner_categories, (category) ->
        return null if category.primary.length + category.secondary.length < 3
        _.extend _.omit(category, 'primary', 'secondary'),
          partners: mergeBuckets(category.primary, category.secondary),
          facet: 'category'

  ]).spread (profiles, categories) ->
    res.locals.sd.MAIN_PROFILES = profiles.toJSON()
    res.locals.sd.CATEGORIES = _.map(categories, (c) -> _.pick c, 'id', 'name')

    categoriesFacet =
      displayName: "Categories"
      facetName: 'category'
      countItems: res.locals.sd.CATEGORIES

    locationsFacet =
      displayName: "Locations"
      facetName: 'location'
      countItems: _.map FeaturedCities, (c) -> {name: c.name, id: c.slug}

    render = res.render 'index',
      ViewHelpers: ViewHelpers
      type: type
      profiles: profiles.models
      categories: _.shuffle categories
      facets: [categoriesFacet, locationsFacet]
      state: if _.isEmpty(searchParams) then 'landing' else 'search'

    .catch next
    .done()


