_ = require 'underscore'
Q = require 'q'
qs = require 'qs'
fs = require 'fs'
request = require 'superagent'
{ resolve } = require 'path'
Backbone = require 'backbone'
ReferrerParser = require 'referer-parser'
FilterArtworks = require '../../collections/filter_artworks'
{ APPLICATION_NAME } = require '../../config'
{ stringifyJSONForWeb } = require '../../components/util/json'
aggregationParams = require './aggregations.coffee'
Artist = require '../../models/artist'
Statuses = require './statuses'
sections = require './sections'
Nav = require './nav'
cache = require '../../lib/cache'

@index = (req, res, next) ->
  return next() unless res.locals.sd.ARTIST_PAGE_FORMAT is 'new' or res.locals.sd.NODE_ENV is 'development'
  artist = new Artist id: req.params.id
  statuses = new Statuses artist: artist
  params = new Backbone.Model artist_id: artist.id
  filterData = { size: 0, artist_id: req.params.id, aggregations: aggregationParams }
  formattedFilterData = decodeURIComponent qs.stringify(filterData, { arrayFormat: 'brackets' })
  filterArtworks = new FilterArtworks

  if (referrer = req.get 'Referrer')?
    medium = new ReferrerParser(referrer).medium

  Q.allSettled([
    artist.fetch(cache: true)
    statuses.fetch(cache: true)
    filterArtworks.fetch(data: formattedFilterData)
  ]).spread((artistRequest, statusesRequest, filterArtworksRequest) ->

    nav = new Nav artist: artist, statuses: statusesRequest.value

    if artistRequest.state is 'rejected'
      res.backboneError(artist, artistRequest.reason)
    else
      if req.params.tab? or artist.href() is res.locals.sd.CURRENT_PATH

        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.TAB = tab = req.params.tab or ''
        res.locals.sd.STATUSES = statuses = statusesRequest.value
        res.locals.sd.MEDIUM = medium if medium?
        res.locals.sd.FILTER_ROOT = artist.href() + '/artworks'
        res.locals.sd.FILTER_COUNTS = counts = filterArtworks.counts

        res.render "index",
          artist: artist
          tab: tab
          statuses: statuses
          nav: nav
          filterRoot: res.locals.sd.FILTER_ROOT
          counts: counts
          activeText: ''
          params: params
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
