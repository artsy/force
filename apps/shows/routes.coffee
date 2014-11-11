_ = require 'underscore'
Q = require 'q'
Items = require '../../collections/items'
PartnerShows = require '../../collections/partner_shows'
cities = require '../../components/locations/cities'

@index = (req, res) ->
  shows = new Items [], id: '530ebe92139b21efd6000071', item_type: 'PartnerShow'
  render = ->
    res.render 'index',
      cities: cities
      shows: shows.take 8 # 2, 3, 3
  shows.fetch success: render, error: render

@city = (req, res, next) ->
  city = _.findWhere(cities, slug: req.params.city)
  return next() unless city?

  criteria = (status) ->
    near: city.coords.toString()
    published_with_eligible_artworks: true
    status: status
    sort: '-start_at'
    size: 18

  upcoming = new PartnerShows
  upcoming.comparator = (show) -> Date.parse(show.get('start_at'))
  current = new PartnerShows
  current.comparator = (show) -> Date.parse(show.get('end_at'))
  past = new PartnerShows
  past.comparator = (show) -> -(Date.parse(show.get('end_at')))

  Q.allSettled([
    upcoming.fetch(cache: true, data: criteria('upcoming'))
    current.fetch(cache: true, data: criteria('running'))
    past.fetch(cache: true, data: criteria('closed'))
  ]).then(->
    opening = upcoming.groupBy (show) -> show.openingThisWeek()

    res.render 'city',
      city: city
      cities: cities
      opening: opening.true or []
      upcoming: opening.false or []
      current: current.models
      past: past.models
  ).done()
