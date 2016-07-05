_ = require 'underscore'
Q = require 'bluebird-q'
fs = require 'fs'
request = require 'superagent'
Backbone = require 'backbone'
ReferrerParser = require 'referer-parser'
{ APPLICATION_NAME, NODE_ENV } = require '../../config'
cache = require '../../lib/cache'
Artist = require '../../models/artist'
Nav = require './nav'
metaphysics = require '../../lib/metaphysics'
query = require './queries/server.coffee'
helpers = require './view_helpers'
currentShowAuction = require './components/current_show_auction/index'

@index = (req, res, next) ->
  tab = req.params.tab or ''
  send =
    query: query,
    variables:
      artist_id: req.params.id
      includeBlurb: (tab is '')

  return if metaphysics.debug req, res, send

  metaphysics send
    .then ({ artist }) ->
      nav = new Nav artist: artist
      next() if not _.find nav.sections(), slug: tab

      if (req.params.tab? or artist.href is res.locals.sd.CURRENT_PATH)
        res.locals.sd.ARTIST = artist
        res.locals.sd.TAB = tab
        currentItem = currentShowAuction(artist)

        res.locals.sd.CURRENT_SHOW_AUCTION = currentItem

        res.render 'index',
          viewHelpers: helpers
          artist: artist
          tab: tab
          nav: nav
          currentItem: currentItem

      else
        res.redirect artist.href

    .catch (err) -> next(err if NODE_ENV is 'development')

@tab = (req, res, next) =>
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res, next

@follow = (req, res) ->
  return res.redirect "/artist/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist/#{req.params.id}"
