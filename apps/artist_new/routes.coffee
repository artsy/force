_ = require 'underscore'
Q = require 'q'
fs = require 'fs'
{ resolve } = require 'path'
Backbone = require 'backbone'
{ stringifyJSONForWeb } = require '../../components/util/json'
Artist = require '../../models/artist'
Statuses = require './statuses'
sections = require './sections'
Nav = require './nav'
Carousel = require './carousel'
request = require 'superagent'
{ APPLICATION_NAME } = require '../../config'
cache = require '../../lib/cache'
ReferrerParser = require 'referer-parser'

@index = (req, res, next) ->
  return next() unless res.locals.sd.ARTIST_PAGE_FORMAT is 'new' or res.locals.sd.NODE_ENV is 'development'
  artist = new Artist id: req.params.id
  carousel = new Carousel artist: artist
  statuses = new Statuses artist: artist

  if (referrer = req.get 'Referrer')?
    medium = new ReferrerParser(referrer).medium

  Q.allSettled([
    artist.fetch(cache: true)
    carousel.fetch(cache: true)
    statuses.fetch(cache: true)
  ]).spread((artistRequest, carouselRequest, statusesRequest) ->

    nav = new Nav artist: artist, statuses: statusesRequest.value

    if artistRequest.state is 'rejected'
      res.backboneError(artist, artistRequest.reason)
    else
      if req.params.tab? or artist.href() is res.locals.sd.CURRENT_PATH

        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.TAB = tab = req.params.tab or ''
        res.locals.sd.STATUSES = statuses = statusesRequest.value
        res.locals.sd.MEDIUM = medium if medium?

        res.render "index",
          artist: artist
          carousel: carousel
          tab: tab
          statuses: statuses
          nav: nav
          jsonLD: stringifyJSONForWeb(artist.toJSONLD())

      else
        res.redirect artist.href()

  ).done()

@tab = (req, res, next) =>
  return next() unless res.locals.sd.ARTIST_PAGE_FORMAT is 'new' or res.locals.sd.NODE_ENV is 'development'
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res, next

@follow = (req, res, next) ->
  return next() unless res.locals.sd.ARTIST_PAGE_FORMAT is 'new' or res.locals.sd.NODE_ENV is 'development'
  return res.redirect "/artist/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist/#{req.params.id}"

@data = (req, res, next) ->
  return next() unless res.locals.sd.ARTIST_PAGE_FORMAT is 'new' or res.locals.sd.NODE_ENV is 'development'
  key = url = "http://#{APPLICATION_NAME}.s3.amazonaws.com/data/#{req.params.id}/#{req.params.section}.json"

  render = (data) ->
    unless _.isEmpty(req.query)
      # If data is cached it's coming out as a string
      data = JSON.parse(data) if _.isString(data)
      for key in ['kind', 'merchandisable']
        if (filters = req.query[key])
          data = _.filter data, (item) ->
            # Cast value to a string for comparison (in the case of booleans)
            _.contains filters, "#{item[key]}"

    res.type 'application/json'
    res.send data

  cache.get key, (err, data) ->
    if data
      render data
    else
      request.get(url).end (err, response) ->
        data = if response.status is 200 then response.body else []
        cache.set key, JSON.stringify(data)
        render data
