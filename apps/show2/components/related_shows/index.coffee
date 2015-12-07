RelatedShowsView = require './view.coffee'
{ Cities, FeaturedCities } = require 'places'
_ = require 'underscore'
ViewHelpers = require '../../helpers/view_helpers.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'

module.exports = (type, show) ->
  el = $('.js-related-shows')

  city = _.findWhere(Cities, name: show.location?.city?.trim())

  criteria =
    sort: 'end_at_asc'
    size: 20
    displayable: true

  switch type
    when 'fair'
      opts =  _.extend criteria, {
        fair_id: show.fair._id
      }
      title = "More Booths from #{show.fair.name}"
    when 'gallery'
      opts = _.extend criteria, {
        sort: 'start_at_desc'
        partner_id: show.partner._id
      }
      title = "Other Shows from #{show.partner.name}"
    when 'featured'
      opts = _.extend criteria, {
        featured: true
        status: 'running'
      }
      el = $('.js-featured-shows')
      title = "Featured Shows"
    when 'city'
      opts = _.extend criteria, {
        near: ViewHelpers.getMetaphysicsLocation(show.location)
        status: 'running'
      }
      title = "Current Shows in #{show.location.city.trim()}"

  metaphysics
    variables: opts
    query: '
      query($featured: Boolean, $size: Int, $sort: PartnerShowSorts, $fair_id: String, $partner_id: String, $near: Near, $status: EventStatus, $displayable: Boolean) {
        related_shows: partner_shows(featured: $featured, size: $size, sort: $sort, fair_id: $fair_id, partner_id: $partner_id, near: $near, status: $status, displayable: $displayable) {
          id
          start_at
          end_at
          name
          partner {
            name
            href
          }
          fair {
            id
            published
            has_full_feature
            name
            href
            start_at
            end_at
          }
          location {
            display
            city
            state
            postal_code
            country
            address
            address_2
          }
          install_shots: images(size: 1, default: false) {
            image: resized(height: 270, version: "large") {
              url
              width
              height
            }
            aspect_ratio
          }
          artworks(size: 5) {
            id
            image {
              image: resized(height: 270, version: "large") {
                url
                width
                height
              }
              aspect_ratio
            }
          }
        }
      }
    '
  .then (data) ->
    new RelatedShowsView
      data: data.related_shows
      el: el
      show: show
      city: city
      title: title
