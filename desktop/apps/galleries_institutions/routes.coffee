Backbone = require 'backbone'
_ = require 'underscore'
Q = require 'bluebird-q'
qs = require 'qs'
cache = require '../../lib/cache'
metaphysics = require '../../lib/metaphysics'
{ API_URL } = require('sharify').data
Partners = require '../../collections/partners'
PartnerCities = require '../../collections/partner_cities'
PartnerFeaturedCities = require '../../collections/partner_featured_cities'
Profiles = require '../../collections/profiles'
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
  Q.promise (resolve, reject) ->
    cache.get "partner_categories:#{type}", (err, cachedData) ->
      return reject(err) if err
      return resolve(JSON.parse(cachedData)) if cachedData

      metaphysics(
        query: query
        variables: _.extend category_type: type.toUpperCase(), type: partnerTypes[type]
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

  Q.all([
    fetchPrimaryCarousel(params)
    partnerCities.fetch(cache: true)
    partnerFeaturedCities.fetch(cache: true)
    fetchPartnerCategories(type)
  ]).spread (profiles, partnerCities, partnerFeaturedCities, categories) ->
    res.locals.sd.MAIN_PROFILES = profiles.toJSON()
    res.locals.sd.PARTNER_CITIES = partnerCities
    res.locals.sd.PARTNER_FEATURED_CITIES = partnerFeaturedCities
    res.locals.sd.CATEGORIES = _.map(categories, (c) -> _.pick c, 'id', 'name')

    res.render 'index',
      ViewHelpers: ViewHelpers
      showAZLink: true
      type: type
      profiles: profiles.models
      categories: _.shuffle categories
      facets: facetDefaults(type)
      state: if _.isEmpty(searchParams) then 'landing' else 'search'

  .catch -> next()
  .done()

# A to Z page

@partnersAZ = (req, res, next) ->
  type = mapType[req.params.type]

  partners = new Partners()
  partners.fetchUntilEndInParallel
    cache: true
    data:
      size: 20
      type: mapTypeClasses[req.params.type]
      sort: 'sortable_id'
      has_full_profile: true
      eligible_for_listing: true

  .then ->
    aToZGroup = partners.groupByAlphaWithColumns 3
    res.render 'a_z',
      type: type
      showBrowseLink: true
      aToZGroup: aToZGroup

  .catch next
  .done()

