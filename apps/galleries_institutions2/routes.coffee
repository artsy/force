_ = require 'underscore'
_s = require 'underscore.string'
Q = require 'bluebird-q'
Backbone = require 'backbone'
PartnerCategories = require '../../collections/partner_categories'
PrimaryCarousel = require './components/primary_carousel/fetch'
CategoryCarousel = require './components/partner_cell_carousel/fetch'

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
  carousel = new PrimaryCarousel()

  Q.all [
    carousel.fetch type
    fetchCategories _s.capitalize type
  ]

  .spread (profiles, carousels) ->

    res.render 'index',
      type: type
      profiles: profiles.models
      carousels: carousels

    .catch next
    .done()