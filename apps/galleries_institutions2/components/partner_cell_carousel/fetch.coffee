Q = require 'bluebird-q'
Partners = require '../../../../collections/partners.coffee'
module.exports = class CategoryCarousel

  constructor: ({ @category }) ->

  fetch: ->
    primaryPartners = new Partners()
    secondaryPartners = new Partners()
    Q.all([
      primaryPartners.fetch( data: partner_categories: [@category.get('id')], size: 3, sort: '-random_score', eligible_for_primary_bucket: true)
      secondaryPartners.fetch( data: partner_categories: [@category.get('id')], size: 3, sort: '-random_score', eligible_for_secondary_bucket: true)
    ]).spread (a, b) =>
      @partners = new Partners (a.concat b)
      this