_ = require 'underscore'
Q = require 'q'
fs = require 'graceful-fs'
{ resolve } = require 'path'
Backbone = require 'backbone'
{ stringifyJSONForWeb } = require '../../components/util/json'
Artist = require '../../models/artist'
Statuses = require './statuses'
sections = require './sections'
Nav = require './nav'
Carousel = require './carousel'

@index = (req, res) ->
  artist = new Artist id: req.params.id
  carousel = new Carousel artist: artist
  statuses = new Statuses artist: artist

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
        res.locals.sd.STATUSES = statuses.statuses

        res.render 'index',
          artist: artist
          carousel: carousel
          tab: tab
          statuses: statuses.statuses
          nav: nav
          jsonLD: stringifyJSONForWeb(artist.toJSONLD())

      else
        res.redirect artist.href()

  ).done()

@tab = (req, res) =>
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res

@follow = (req, res) ->
  return res.redirect "/artist/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist/#{req.params.id}"

# Temporary
@data = (req, res) ->
  try
    filename = resolve __dirname, "./public/data/#{req.params.id}/#{req.params.section}.json"
    data = fs.readFileSync filename
  catch
    data = '[]'

  data = JSON.parse(data)

  for key in ['kind', 'merchandisable']
    if (filters = req.query[key])
      data = _.filter data, (item) ->
        _.contains(filters, "#{item[key]}")
  res.send data
