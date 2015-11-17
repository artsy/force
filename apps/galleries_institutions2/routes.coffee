Partners = require '../../collections/partners'
PartnerCategories = require '../../collections/partner_categories'
Profile = require '../../models/profile'
PartnerCellGrid = require './components/partner_cell_grid/view'
Backbone = require 'backbone'
Q = require 'bluebird-q'
PrimaryCarousel = require './components/primary_carousel/fetch'

fetchCategories = (type) ->
  categories = new PartnerCategories()
  categories.fetchUntilEnd data: category_type: type
    .then ->
      Q.all categories.map (category) ->
        category.related().partners.fetch data: { size: 6, sort: '-random_score' }

    .then ->
      categories.select (category) ->
        category.related().partners.length

@galleries = (req, res, next) ->
  carousel = new PrimaryCarousel

  Q.all([
    carousel.fetch()
    fetchCategories('Gallery')
  ])

  .spread (shows, categories) ->

    res.render 'index',
      type: 'gallery'
      shows: shows
      categories: categories

    .catch next
    .done()

@institutions = (req, res, next) ->
  carousel = new PrimaryCarousel

  Q.all([
    carousel.fetch()
    fetchCategories('Institution')
  ])

  .spread (shows, categories) ->

    res.render 'index',
      type: 'institution'
      shows: shows
      categories: categories

    .catch next
    .done()