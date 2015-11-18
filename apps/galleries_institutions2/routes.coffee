PartnerCategories = require '../../collections/partner_categories'
Backbone = require 'backbone'
Q = require 'bluebird-q'
PrimaryCarousel = require './components/primary_carousel/fetch'
CategoryCarousel = require './components/partner_cell_carousel/fetch'
_ = require 'underscore'

fetchCategories = (type) ->
  categories = new PartnerCategories()
  categories.fetchUntilEnd cache: true, data: category_type: type
    .then ->
      Q.all categories.map (category) ->
        carousel = new CategoryCarousel(category: category)
        carousel.fetch()

    .then (carousels) ->
      _.select carousels, (carousel) ->
        carousel.partners.length > 0

@galleries = (req, res, next) ->
  carousel = new PrimaryCarousel

  Q.all([
    carousel.fetch()
    fetchCategories('Gallery')
  ])

  .spread (shows, carousels) ->
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