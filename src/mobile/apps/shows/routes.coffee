_ = require 'underscore'
Q = require 'bluebird-q'
Items = require '../../collections/items'

PartnerShows = require '../../collections/partner_shows'
{Cities, FeaturedCities} = require 'places'


module.exports.index = (req, res) ->
  shows = new Items [], id: '530ebe92139b21efd6000071', item_type: 'PartnerShow'
  render = ->
    res.render 'index',
      cities: Cities
      featuredCities: FeaturedCities
      featuredShow: shows.models[0]

  shows.fetch success: render, error: render

module.exports.city = (req, res, next) ->
  city = _.findWhere(Cities, slug: req.params.city)
  return next() unless city?

  criteria = (status) ->
    near: city.coords.toString()
    displayable: true
    status: status
    sort: '-start_at'
    size: 18
    at_a_fair: false

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

    res.locals.sd.CURRENT_CRITERIA = criteria('running')
    res.locals.sd.CURRENT_CRITERIA.comparator = (show) -> Date.parse(show.get('end_at'))

    res.render 'city',
      city: city
      cities: Cities
      featuredCities: FeaturedCities
      opening: opening.true or []
      upcoming: opening.false or []
      current: current.models
      past: past.models
      size: criteria().size
  ).done()

module.exports.all_cities = (req, res, next) ->
  res.render 'all_cities', cities: Cities
