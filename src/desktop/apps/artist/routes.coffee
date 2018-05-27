_ = require 'underscore'
Q = require 'bluebird-q'
qs = require 'qs'
fs = require 'fs'
request = require 'superagent'
Backbone = require 'backbone'
ReferrerParser = require 'referer-parser'
{ APPLICATION_NAME, NODE_ENV, APP_URL } = require '../../config'
cache = require '../../lib/cache'
Artist = require '../../models/artist'
Nav = require './nav'
metaphysics = require '../../../lib/metaphysics'
query = require './queries/server.coffee'
helpers = require './view_helpers'
currentShowAuction = require './components/current_show_auction/index'
currentVeniceFeature = require './components/current_venice_feature/index'
sd = require('sharify').data

@index = (req, res, next) ->
  tab = if req.params.tab? then req.params.tab else ''
  isReqFromReflection = res.locals.sd.REFLECTION
  send =
    query: query,
    variables:
      artist_id: req.params.id
      includeBlurb: (tab is '')
      includeJSONLD: isReqFromReflection
    req: req

  return if metaphysics.debug req, res, send

  metaphysics send
    .then ({ artist }) ->
      nav = new Nav artist: artist

      return res.redirect(artist.href) unless(_.find nav.sections(), slug: tab) or artist.counts.artworks is 0

      # TODO: ARTIST_MARKET_DATA_TEST remove after test closes
      testGroup = res.locals.sd.ARTIST_MARKET_DATA_TEST
  
      if (req.params.tab? or artist.href is res.locals.sd.CURRENT_PATH)
        currentVeniceFeature(artist)
          .then (veniceFeature) ->
            currentItem = veniceFeature or currentShowAuction(artist)

            res.locals.sd.ARTIST = artist
            res.locals.sd.TAB = tab
            res.locals.sd.CURRENT_ITEM = currentItem
            res.locals.sd.ARTIST_PAGE_CTA_ENABLED = !(res.locals.sd.CURRENT_USER? || res.locals.sd.REFERRER?.includes(APP_URL))

            res.render 'index',
              viewHelpers: helpers
              artist: artist
              tab: tab
              nav: nav
              currentItem: currentItem
              testGroup: testGroup
              jsonLD: JSON.stringify helpers.toJSONLD artist if isReqFromReflection

      else
        res.redirect artist.href

    .catch next

@tab = (req, res, next) =>
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res, next

@follow = (req, res) ->
  return res.redirect "/artist/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist/#{req.params.id}?#{qs.stringify req.query}"

