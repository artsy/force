Partners = require '../../collections/partners'
PartnerCategories = require '../../collections/partner_categories'
Profile = require '../../models/profile'
PartnerCellGrid = require './components/partner_cell_grid/view'
Backbone = require 'backbone'
Q = require 'bluebird-q'
PrimaryCarousel = require './components/primary_carousel/fetch'

@galleries = (req, res, next) ->
  carousel = new PrimaryCarousel
  categories = new PartnerCategories

  Q.all [
    carousel.fetch()
    categories.fetchUntilEnd data: category_type: 'Gallery'
  ]
    .then ->
      Q.all categories.map (category) ->
        category.related().partners.fetch data: size: 10

    .then ->
      filteredCategories = categories.select (category) ->
        category.related().partners.length

      res.render 'index',
        type: 'gallery'
        carousel: carousel
        categories: filteredCategories

    .catch next
    .done()

@institutions = (req, res, next) ->
  categories = new PartnerCategories()
  categories.fetchUntilEnd data: category_type: 'Institution'
    .then ->

      Q.all categories.map (category) ->
        category.related().partners.fetch data: size: 10

      .then ->
        filteredCategories = categories.select (category) ->
          category.related().partners.length

        res.render 'index', categories: filteredCategories, type: 'institution'
