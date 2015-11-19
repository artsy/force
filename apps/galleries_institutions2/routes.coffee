_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
PartnerCategories = require '../../collections/partner_categories'
PrimaryCarousel = require './components/primary_carousel/fetch'
CategoryCarousel = require './components/partner_cell_carousel/fetch'

fetchCategories = (type) ->
  categories = new PartnerCategories
  categories.fetchUntilEnd cache: true, data: category_type: type
    .then ->
      Q.all categories.map (category) ->
        carousel = new CategoryCarousel category: category
        carousel.fetch()

    .then (carousels) ->
      _.select carousels, (carousel) ->
        carousel.partners.length > 0

@galleries = (req, res, next) ->
  carousel = new PrimaryCarousel

  Q.all [
    carousel.fetch()
    fetchCategories 'Gallery'
  ]
    .spread (shows, carousels) ->

      res.locals.sd.CAROUSELS = carousels

      res.render 'index',
        type: 'gallery'
        shows: shows
        carousels: carousels

    .catch next
    .done()

@institutions = (req, res, next) ->
  carousel = new PrimaryCarousel

  Q.all([
    carousel.fetch()
    fetchCategories('Institution')
  ])

  .spread (shows, carousels) ->

    res.render 'index',
      type: 'institution'
      shows: shows
      carousels: carousels

    .catch next
    .done()