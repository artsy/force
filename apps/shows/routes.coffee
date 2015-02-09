_ = require 'underscore'
Q = require 'q'
Items = require '../../collections/items'
PartnerShows = require '../../collections/partner_shows'
{ Cities } = require 'places'
{ FeaturedCities } = require 'places'

@index = (req, res) ->
  shows = new Items [], id: '530ebe92139b21efd6000071', item_type: 'PartnerShow'
  render = ->
    res.render 'index',
      cities: Cities
      featuredCities: FeaturedCities
      shows: shows.take 8 # 2, 3, 3
  shows.fetch success: render, error: render

@city = (req, res, next) ->
  city = _.findWhere(Cities, slug: req.params.city)
  return next() unless city?

  currentPage = parseInt req.query.page or 1
  pageSize = 18

  criteria = (status) ->
    near: city.coords.toString()
    published_with_eligible_artworks: true
    status: status
    sort: '-start_at'
    size: pageSize

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
      cities: Cities
      featuredCities: FeaturedCities
      opening: opening.true or []
      upcoming: opening.false or []
      current: current
      past: past
  ).done()
