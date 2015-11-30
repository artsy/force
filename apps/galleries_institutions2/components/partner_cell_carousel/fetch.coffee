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
      size: 6
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

        if primary.length < 3
          secondary = secondary.slice(0, 6 - primary.length)
        else if secondary.length < 3
          primary = primary.slice(0, 6 - secondary.length)
        else
          primary = primary.slice(0, 3)
          secondary = secondary.slice(0, 3)

        @partners.reset _.shuffle(primary).concat _.shuffle(secondary)
        this
