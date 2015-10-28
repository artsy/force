_ = require 'underscore'
Q = require 'bluebird-q'
fs = require 'fs'
request = require 'superagent'
Backbone = require 'backbone'
ReferrerParser = require 'referer-parser'
{ APPLICATION_NAME } = require '../../config'
{ stringifyJSONForWeb } = require '../../components/util/json'
cache = require '../../lib/cache'
Artist = require '../../models/artist'
Statuses = require './statuses'
Nav = require './nav'
Carousel = require './carousel'

@index = (req, res, next) ->
  artist = new Artist id: req.params.id
  carousel = new Carousel artist: artist
  statuses = new Statuses artist: artist

  if (referrer = req.get 'Referrer')?
    medium = new ReferrerParser(referrer).medium

  Q.all [
    artist.fetch cache: true
    carousel.fetch cache: true
    statuses.fetch cache: true
  ]
    .then ->
      nav = new Nav artist: artist, statuses: statuses.statuses

      if req.params.tab? or artist.href() is res.locals.sd.CURRENT_PATH

        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.TAB = tab = req.params.tab or ''
        res.locals.sd.STATUSES = statuses = statuses.statuses
        res.locals.sd.MEDIUM = medium if medium?

        res.render 'index',
          artist: artist
          carousel: carousel
          tab: tab
          statuses: statuses
          nav: nav
          jsonLD: stringifyJSONForWeb artist.toJSONLD()

      else
        res.redirect artist.href()

    .catch next
    .done()

@tab = (req, res) =>
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res

@follow = (req, res) ->
  return res.redirect "/artist/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist/#{req.params.id}"
