_ = require 'underscore'
_s = require 'underscore.string'
Q = require 'bluebird-q'
{ API_URL } = require('sharify').data
PartnerCategory = require '../../models/partner_category'
PartnerCategories = require '../../collections/partner_categories'
fetchPrimaryCarousel = require './components/primary_carousel/fetch'
Partners = require '../../collections/partners'
Profiles = require '../../collections/profiles'
{ FeaturedCities } = require 'places'
Backbone = require 'backbone'
qs = require 'qs'
carouselFetch = require './components/fetch_carousel_partners/fetch.coffee'

mapType =
  galleries: 'gallery'
  institutions: 'institution'

fetchPartnersForCategories = (categories, type) ->
  Q.all categories.map (category) ->
    carouselParams = type: type, category: category.get('id')

    carouselFetch(carouselParams).then (partners) ->
      category: category, partners: partners

  .then (carousels) ->
    _.shuffle _.select carousels, (carousel) ->
      carousel.partners.length >= 3

@index = (req, res, next) ->
  res.locals.sd.PARTNERS_ROOT = req.params.type
  type = mapType[req.params.type]
  params = _.extend _.pick(req.query, 'location', 'category'), type: type

  categories = new PartnerCategories

  fetchCategories = categories.fetchUntilEndInParallel
    data: category_type: _s.capitalize type,
    cache: true,
    internal: false

  Q.all([
    fetchPrimaryCarousel(params)
    fetchCategories.then ->
      res.locals.sd.CATEGORIES = categories
      fetchPartnersForCategories(categories, type)

  ]).spread (profiles, carousels) ->
    res.locals.sd.MAIN_PROFILES = profiles.toJSON()
    res.locals.sd.CAROUSELS = carousels if carousels

    render = res.render 'index',
      type: type
      profiles: profiles.models
      carousels: carousels
      locations:  FeaturedCities
      categories: categories.models

    .catch next
    .done()


