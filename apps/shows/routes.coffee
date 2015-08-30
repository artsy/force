_ = require 'underscore'
Q = require 'bluebird-q'
Items = require '../../collections/items'
PartnerShows = require './shows'
{ Cities, FeaturedCities } = require 'places'

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

  upcoming = new PartnerShows
  upcoming.comparator = (show) -> Date.parse(show.get('start_at'))
  current = new PartnerShows [], state: currentPage: currentPage, pageSize: pageSize
  current.comparator = (show) -> Date.parse(show.get('end_at'))
  past = new PartnerShows
  past.comparator = (show) -> -(Date.parse(show.get('end_at')))

  criteria =
    near: city.coords.toString()
    sort: '-start_at'
    size: pageSize
    displayable: true
    at_a_fair: false

  Q.allSettled([
    upcoming.fetch(cache: true, data: _.defaults(status: 'upcoming', criteria))
    current.fetch(cache: true, data: _.defaults(status: 'running', total_count: true, sort: 'end_at', criteria))
    past.fetch(cache: true, data: _.defaults(status: 'closed', criteria))
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
