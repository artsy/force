Backbone = require 'backbone'
_ = require 'underscore'
Q = require 'bluebird-q'
qs = require 'qs'
metaphysics = require '../../lib/metaphysics'
{ API_URL } = require('sharify').data
{ FeaturedCities } = require 'places'
Partners = require '../../collections/partners'
Profiles = require '../../collections/profiles'
ViewHelpers = require './components/partner_cell/view_helpers'
query = require './queries/partner_categories_query'
partnerTypes = require './queries/partner_types'
mergeBuckets = require './components/partner_cell_carousel/merge_buckets'
fetchPrimaryCarousel = require './components/primary_carousel/fetch'

mapType =
  galleries: 'gallery'
  institutions: 'institution'

@index = (req, res, next) ->
  type = mapType[req.params.type]
  searchParams = _.pick(req.query, 'location', 'category')
  params = _.extend type: type, searchParams

  Q.all([
    fetchPrimaryCarousel(params)
    metaphysics(
      query: query
      variables: _.extend category_type: type.toUpperCase(), type: partnerTypes[type]
    ).then (data) ->
      _.compact _.map data.partner_categories, (category) ->
        return null if category.primary.length + category.secondary.length < 3
        _.extend _.omit(category, 'primary', 'secondary'),
          partners: mergeBuckets(category.primary, category.secondary),
          facet: 'category'

  ]).spread (profiles, categories) ->
    res.locals.sd.MAIN_PROFILES = profiles.toJSON()
    res.locals.sd.CATEGORIES = _.map(categories, (c) -> _.pick c, 'id', 'name')

    locationsFacet =
      displayName: "Locations"
      facetName: 'location'
      countItems: _.map FeaturedCities, (c) -> {name: c.name, id: c.slug}

    categoriesFacet =
      displayName: "Specialties"
      facetName: 'category'
      countItems: res.locals.sd.CATEGORIES

    render = res.render 'index',
      ViewHelpers: ViewHelpers
      showAZLink: true
      type: type
      profiles: profiles.models
      categories: _.shuffle categories
      facets: [locationsFacet, categoriesFacet]
      state: if _.isEmpty(searchParams) then 'landing' else 'search'

  .catch next
  .done()

# A to Z page

fetchAZ =
  gallery: ->
    new Partners()
      .fetchUntilEndInParallel
        cache: true
        data:
          size: 20
          type: 'PartnerGallery'
          sort: 'sortable_id'
          has_full_profile: true

  institution: ->
    new Profiles()
      .fetchUntilEndInParallel
        cache: true
        url: "#{API_URL}/api/v1/set/51fbd2f28b3b81c2de000444/items"
        data: size: 20

@partnersAZ = (req, res, next) ->
  type = mapType[req.params.type]
  fetchAZ[type]().then (partners) ->
    aToZGroup = partners.groupByAlphaWithColumns 3
    res.render 'a_z',
      type: type
      showAZLink: false
      aToZGroup: aToZGroup

  .catch next
  .done()

