_ = require 'underscore'
_s = require 'underscore.string'
Q = require 'bluebird-q'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
PartnerCategories = require '../../collections/partner_categories'
PrimaryCarousel = require './components/primary_carousel/fetch'
CategoryCarousel = require './components/partner_cell_carousel/fetch'
Partners = require '../../collections/partners'
Profiles = require '../../collections/profiles'

# Landing page

fetchCategories = (type) ->
  categories = new PartnerCategories
  categories.fetchUntilEnd cache: true, data: category_type: type, internal: false
    .then ->
      Q.all categories.map (category) ->
        carousel = new CategoryCarousel category: category
        carousel.fetch()

    .then (carousels) ->
      _.select carousels, (carousel) ->
        carousel.partners.length > 0

@galleries = (req, res, next) ->
  partners req, res, next, 'gallery'

@institutions = (req, res, next) ->
  partners req, res, next, 'institution'

partners = (req, res, next, type) ->

  carousel = new PrimaryCarousel

  Q.all [
    carousel.fetch type
    fetchCategories _s.capitalize type
  ]

  .spread (profiles, carousels) ->

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
          active: true
          type: 'PartnerGallery'
          sort: 'sortable_id'
          has_full_profile: true

  institution: ->
    new Profiles()
      .fetchUntilEndInParallel
        cache: true
        url: "#{API_URL}/api/v1/set/51fbd2f28b3b81c2de000444/items"
        data: size: 20

@galleriesAZ = (req, res, next) ->
  partnersAZ req, res, next, 'gallery'

@institutionsAZ = (req, res, next) ->
  partnersAZ req, res, next, 'institution'

partnersAZ = (req, res, next, type) ->
  fetchAZ[type]().then (partners) ->
    aToZGroup = partners.groupByAlphaWithColumns 3
    res.render 'a_z',
      type: type
      showAZLink: false
      aToZGroup: aToZGroup

    .catch next
    .done()
