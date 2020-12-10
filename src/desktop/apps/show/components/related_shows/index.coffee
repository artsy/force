_ = require 'underscore'
{ Cities } = require 'places'
ViewHelpers = require '../../helpers/view_helpers.coffee'
DateHelpers = require '../../../../components/util/date_helpers.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
query = require './query.coffee'
template = -> require('./template.jade') arguments...

module.exports = (type, show) ->
  $el = $('.js-related-shows')

  city = _.findWhere Cities, name: show.location?.city?.trim()

  criteria =
    sort: 'end_at_asc'
    size: 20
    displayable: true

  switch type
    when 'fair'
      title = "More Booths from #{show.fair.name}"
      options =  _.extend criteria,
        fair_id: show.fair._id

    when 'gallery'
      title = "Other Shows from #{show.partner.name}"
      options = _.extend criteria,
        sort: 'start_at_desc'
        partner_id: show.partner._id

    when 'featured'
      title = "Featured Shows"
      options = _.extend criteria,
        featured: true
        status: 'running'

    when 'city'
      title = "Current Shows in #{show.location.city.trim()}"
      options = _.extend criteria,
        near: ViewHelpers.getMetaphysicsLocation(show.location)
        status: 'running'

  metaphysics
    variables: options,
    query: query

  .then ({ related_shows }) ->
    _.chain related_shows
      # Filter out the current show
      .filter ({ id }) ->
        id isnt show.id

      # Merge the two image arrays
      .map (related_show) ->
        related_show.images = _.compact(
          related_show.install_shots
            .concat _.pluck related_show.artworks, 'image'
        )
        related_show

      .value()

  .then (related_shows) ->
    return unless related_shows.length

    $el.html template
      title: title
      shows: related_shows
      show: show
      city: city
      DateHelpers: DateHelpers
      ViewHelpers: ViewHelpers
      fromShowGuide: location.search.match 'from-show-guide'
      linkToFair: show.fair?.published && show.fair.profile?.is_published

  .catch console.error.bind(console)
