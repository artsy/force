_ = require 'underscore'
Q = require 'bluebird-q'
Partners = require '../../../../collections/partners.coffee'

module.exports = class CategoryCarousel
  constructor: ({ @category }) ->
    @partners = new Partners

  fetch: ->
    options =
      active: true
      has_full_profile: true
      size: 3
      sort: '-random_score'
      partner_categories: [@category.id]

    Q.all [
      new Partners().fetch {
        cache: true,
        data: _.extend eligible_for_primary_bucket: true, options
      }
      new Partners().fetch {
        cache: true
        data: _.extend eligible_for_secondary_bucket: true, options
      }
    ]
      .spread (primary, secondary) =>
        @partners.reset primary.concat secondary
        this
