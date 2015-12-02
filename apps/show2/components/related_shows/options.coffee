{ Cities, FeaturedCities } = require 'places'
_ = require 'underscore'
ViewHelpers = require '../../helpers/view_helpers.coffee'

module.exports = (type, show) ->

  city = _.findWhere(Cities, name: show.location?.city?.trim())

  criteria =
    sort: 'end_at_asc'
    size: 20
    displayable: true

  switch type
    when 'fair'
      data =  _.extend criteria, {
        fair_id: show.fair._id
      }
      title = "More Booths from #{show.fair.name}"
    when 'gallery'
      data = _.extend criteria, {
        sort: 'start_at_desc'
        partner_id: show.partner._id
      }
      title = "Other Shows from #{show.partner.name}"
    when 'featured'
      data = _.extend criteria, {
        featured: true
        status: 'running'
      }
      el = $('.js-featured-shows')
      title = "Featured Shows"
    when 'city'
      data = _.extend criteria, {
        near: ViewHelpers.getMetaphysicsLocation(show.location)
        status: 'running'
      }
      title = "Current Shows in #{show.location.city.trim()}"

  { options: data, title: title, city: city }