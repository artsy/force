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
payoffQuery = require '../../components/artist_page_cta/query'
helpers = require './view_helpers'
currentShowAuction = require './components/current_show_auction/index'
currentVeniceFeature = require './components/current_venice_feature/index'
SplitTest = require '../../components/split_test/server_split_test'
runningTests = require '../../components/split_test/running_tests'
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
    req: req

  return if metaphysics.debug req, res, send

  metaphysics send
    .then ({ artist }) ->
      nav = new Nav artist: artist

      return res.redirect(artist.href) unless(_.find nav.sections(), slug: tab) or artist.counts.artworks is 0

      artistTest = new SplitTest req, res, runningTests.artist_page
      artistTestOutcome = artistTest.outcome()

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
              jsonLD: JSON.stringify helpers.toJSONLD artist if includeJSONLD
              showSections:
                header: artistTestOutcome is 'control' or artistTestOutcome is 'no_info'
                info: artistTestOutcome is 'control' or artistTestOutcome is 'no_header'

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

@ctaPayoff = (req, res) ->
  if req.user?
    req.user.fetch
      success: (model, resp, options) ->
        user = _.extend(resp, res.locals.sd.CURRENT_USER)
        send =
          query: payoffQuery,
          variables:
            artist_id: req.params.id
          req: user: user, id: req.id
        req.user.followArtist req.params.id,
          error: res.backboneError
          success: ->
            return if metaphysics.debug req, res, send
            metaphysics send
              .then ({ me, artist }) ->
                res.locals.sd.CURRENT_USER = user
                res.locals.sd.INITIAL_ARTISTS = me.suggested_artists
                res.locals.sd.IS_PAYOFF = true
                res.render 'payoff',
                  name: user.name
                  href: "/artist/#{req.params.id}?#{qs.stringify req.query}"
                  artist: artist
              .catch (err) -> next
  else
    res.redirect "/artist/#{req.params.id}"
