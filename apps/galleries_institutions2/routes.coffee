Partners = require '../../collections/partners'
PartnerCategories = require '../../collections/partner_categories'
Profile = require '../../models/profile'
PartnerCellGrid = require './components/partner_cell_grid/view'
Backbone = require 'backbone'
Q = require 'bluebird-q'

@galleries = (req, res, next) ->
  partners = new Partners()
  categories = new PartnerCategories()

  categories.fetchUntilEnd
    data: { category_type: 'Gallery' }
    error: res.backboneError
    success: ->

      Q.allSettled(categories.map (category) ->
        partners = new Partners
        category.set('partners', partners)
        partners.fetchUntilEnd
          data: { partner_categories: category.id}
          error: res.backboneError
      ).then ->
        filteredCategories = categories.select (category) ->
          category.get('partners').length

        res.render 'index', categories: filteredCategories
