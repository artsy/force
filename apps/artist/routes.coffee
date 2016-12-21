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
currentEOYListing = require './components/current_eoy_listing/index'
sd = require('sharify').data

@index = (req, res, next) ->
  tab = if req.params.tab? then req.params.tab else ''
  includeJSONLD = res.locals.sd.REFLECTION
  send =
    query: query,
    variables:
      artist_id: req.params.id
      includeBlurb: (tab is '')
      includeJSONLD: includeJSONLD

  return if metaphysics.debug req, res, send

  metaphysics send
    .then ({ artist }) ->
      nav = new Nav artist: artist

      return res.redirect(artist.href) unless(_.find nav.sections(), slug: tab) or artist.counts.artworks is 0

      if (req.params.tab? or artist.href is res.locals.sd.CURRENT_PATH)
        currentEOYListing(artist)
          .then (currentEOYListing) ->
            currentItem = currentEOYListing or currentShowAuction(artist)

            res.locals.sd.ARTIST = artist
            res.locals.sd.TAB = tab
            res.locals.sd.CURRENT_ITEM = currentItem

            res.render 'index',
              viewHelpers: helpers
              artist: artist
              tab: tab
              nav: nav
              currentItem: currentItem
              jsonLD: JSON.stringify helpers.toJSONLD artist if includeJSONLD

          .catch (err) -> next(err if NODE_ENV is 'development')

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
