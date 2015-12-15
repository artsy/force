_ = require 'underscore'
_s = require 'underscore.string'
Q = require 'bluebird-q'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
PartnerCategory = require '../../models/partner_category'
PartnerCategories = require '../../collections/partner_categories'
PrimaryCarousel = require './components/primary_carousel/fetch'
CategoryCarousel = require './components/partner_cell_carousel/fetch'
Partners = require '../../collections/partners'
Profiles = require '../../collections/profiles'
{ FeaturedCities } = require 'places'

mapType =
  galleries: 'gallery'
  institutions: 'institution'

# Landing page

fetchCategories = (type) ->
  categories = new PartnerCategories
  categories.fetchUntilEnd cache: true, data: category_type: _s.capitalize type, internal: false
    .then ->
      categories

fetchPartnersForCategories = (categories) ->
  Q.all categories.map (category) ->
    carousel = new CategoryCarousel category: category
    carousel.fetch()

  .then (carousels) ->
    _.shuffle _.select carousels, (carousel) ->
      carousel.partners.length >= 3

@partners = (req, res, next) ->
  return next() if req.params.type not in ['galleries', 'institutions']
  return next() if not _.isEmpty req.query
  res.locals.sd.PARTNERS_ROOT = req.params.type
  type = mapType[req.params.type]

  carousel = new PrimaryCarousel
  Q.all([
    carousel.fetch(type)
    fetchCategories(type).then (categories) ->
      fetchPartnersForCategories(categories)
  ]).spread (profiles, carousels) ->

    res.locals.sd.MAIN_PROFILES = profiles.toJSON()
    res.locals.sd.CAROUSELS = carousels

    res.render 'index',
      type: type
      showAZLink: true
      profiles: profiles.models
      carousels: carousels

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
  return next() if req.params.type not in ['galleries', 'institutions']
  res.locals.sd.PARTNERS_ROOT = req.params.type
  type = mapType[req.params.type]
  fetchAZ[type]().then (partners) ->
    aToZGroup = partners.groupByAlphaWithColumns 3
    res.render 'a_z',
      type: type
      showAZLink: false
      aToZGroup: aToZGroup

    .catch next
    .done()

# Search page

@partnersSearch = (req, res, next) ->
  return next() if req.params.type not in ['galleries', 'institutions']
  type = mapType[req.params.type]
  fetchCategories(type).then (categories) ->
    res.locals.sd.CATEGORIES = categories.toJSON()
    res.locals.sd.PARTNERS_ROOT = req.params.type
    res.render 'search', categories: categories.models, locations: FeaturedCities, type: type
