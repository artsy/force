_ = require 'underscore'
Q = require 'bluebird-q'
Items = require '../../collections/items'
PartnerShows = require './shows'
PartnerCities = require '../../collections/partner_cities'
PartnerFeaturedCities = require '../../collections/partner_featured_cities'

@index = (req, res, next) ->
  shows = new Items [], id: '530ebe92139b21efd6000071', item_type: 'PartnerShow'
  partnerCities = new PartnerCities()
  partnerFeaturedCities = new PartnerFeaturedCities()

  Q.all([
    partnerCities.fetch(cache: true)
    partnerFeaturedCities.fetch(cache: true)
    shows.fetch(cache: true)
  ]).then ->
    res.render 'index',
      cities: partnerCities.toJSON()
      featuredCities: partnerFeaturedCities.toJSON()
      shows: shows.take 8 # 2, 3, 3
  .catch next

@redirectShow = (req, res) ->
  res.redirect 301, req.url.replace 'show', 'shows'

@redirectFromCity = (req, res) ->
  res.redirect 302, req.url.replace '/city/', '/shows/'

@city = (req, res, next) ->
  partnerCities = new PartnerCities()
  partnerFeaturedCities = new PartnerFeaturedCities()

  Q.all([
    partnerCities.fetch(cache: true)
    partnerFeaturedCities.fetch(cache: true)
  ]).then ->
    city = _.findWhere(partnerCities.toJSON(), slug: req.params.city)
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

    Q.all([
      upcoming.fetch(cache: true, data: _.defaults(status: 'upcoming', sort: 'start_at', criteria))
      current.fetch(cache: true, data: _.defaults(status: 'running', total_count: true, sort: 'end_at', criteria))
      past.fetch(cache: true, data: _.defaults(status: 'closed', criteria))
    ]).then ->
      opening = upcoming.groupBy (show) -> show.openingThisWeek()
      res.render 'city',
        city: city
        cities: partnerCities.toJSON()
        featuredCities: partnerFeaturedCities.toJSON()
        opening: opening.true or []
        upcoming: opening.false or []
        current: current
        past: past
  .catch next
