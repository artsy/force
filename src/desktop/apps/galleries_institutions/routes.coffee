_ = require 'underscore'
{ cache } = require('../../../lib/cache')
metaphysics = require '../../../lib/metaphysics2.coffee'
{ API_URL } = require('sharify').data
{ PartnerCities } = require '../../collections/partner_cities'
{ PartnerFeaturedCities } = require '../../collections/partner_featured_cities'
ViewHelpers = require './components/partner_cell/view_helpers'
query = require './queries/partner_categories_query'
partnerTypes = require './queries/partner_types'
mergeBuckets = require './components/partner_cell_carousel/merge_buckets'
fetchPrimaryCarousel = require './components/primary_carousel/fetch'
facetDefaults = require './components/filter_facet/facet_defaults.coffee'

mapType =
  galleries: 'gallery'
  institutions: 'institution'

mapTypeClasses =
  galleries: ['PartnerGallery']
  institutions: ['PartnerInstitution', 'PartnerInstitutionalSeller']

filterPartnerCategories = (data) ->
  _.compact _.map data.partner_categories, (category) ->

    return if category.primary.length + category.secondary.length is 0

    _.extend _.omit(category, 'primary', 'secondary'),
      partners: mergeBuckets(category.primary, category.secondary),
      facet: 'category'

fetchPartnerCategories = (type) ->
  new Promise (resolve, reject) ->
    cache.get "partner_categories:#{type}", (err, cachedData) ->
      return reject(err) if err
      return resolve(JSON.parse(cachedData)) if cachedData

      metaphysics(
        query: query
        variables: _.extend categoryType: type.toUpperCase(), type: partnerTypes[type]
      ).then (data) ->
        categories = filterPartnerCategories data
        cache.set "partner_categories:#{type}", JSON.stringify(categories)
        resolve(categories)

@index = (req, res, next) ->
  type = mapType[req.params.type]
  searchParams = _.pick(req.query, 'location', 'category')
  params = _.extend type: type, searchParams
  partnerCities = new PartnerCities()
  partnerFeaturedCities = new PartnerFeaturedCities()

  Promise.all([
    fetchPrimaryCarousel(params)
    partnerCities.fetch()
    partnerFeaturedCities.fetch()
    fetchPartnerCategories(type)
  ])
    .then ([profiles, partnerCities, partnerFeaturedCities, categories]) ->
      res.locals.sd.MAIN_PROFILES = profiles.toJSON()
      res.locals.sd.PARTNER_CITIES = partnerCities
      res.locals.sd.PARTNER_FEATURED_CITIES = partnerFeaturedCities
      res.locals.sd.CATEGORIES = _.map(categories, (c) -> _.pick c, 'id', 'name')

      res.render 'index',
        ViewHelpers: ViewHelpers
        type: type
        profiles: profiles.models
        categories: _.shuffle categories
        facets: facetDefaults(type)
        state: if _.isEmpty(searchParams) then 'landing' else 'search'

    .catch -> next()
