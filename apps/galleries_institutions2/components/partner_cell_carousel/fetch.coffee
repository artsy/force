_ = require 'underscore'
Q = require 'bluebird-q'

Partners = require '../../../../collections/partners.coffee'
fetch = require '../fetch_carousel_partners/fetch.coffee'

module.exports = class CategoryCarousel
  constructor: ({ @category }) ->

  fetch: ->
    options =
      partner_categories: [@category.id]

    if @category.get('category_type') is 'Gallery'
      fetch.galleries(options).then (partners) =>
        @partners = partners
        this

    else
      fetch.institutions(options).then (partners) =>
        @partners = partners
        this
