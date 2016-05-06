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

@index = index = (req, res, next) ->
  artist = new Artist id: req.params.id
  carousel = new Carousel artist: artist
  statuses = new Statuses artist: artist

  Q.all [
    artist.fetch cache: true
    carousel.fetch cache: true
    statuses.fetch cache: true
  ]
    .then ->
      return next() unless artist.get('display_auction_link')
      nav = new Nav artist: artist, statuses: statuses.statuses

      if req.params.tab? or artist.href() is res.locals.sd.CURRENT_PATH

        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.TAB = tab = req.params.tab or ''
        res.locals.sd.STATUSES = statuses = statuses.statuses

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

@tab = (req, res, next) ->
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  index req, res, next

@follow = (req, res) ->
  return res.redirect "/artist/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist/#{req.params.id}"
