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
Nav = require './nav'
metaphysics = require '../../lib/metaphysics'
query = require './query'
helpers = require './view_helpers'

@index = (req, res, next) ->
  metaphysics(
    query: query
    variables: artist_id: req.params.id
  ).then(({artist}) ->
    nav = new Nav artist: artist

    if req.params.tab? or artist.href is res.locals.sd.CURRENT_PATH
      console.log artist.statuses
      res.locals.sd.ARTIST = artist
      res.locals.sd.TAB = tab = req.params.tab or ''

      res.render 'index',
        viewHelpers: helpers
        artist: artist
        tab: tab
        nav: nav
        # jsonLD: stringifyJSONForWeb artist.toJSONLD()

    else
      res.redirect artist.href

  ).catch (e) ->
    console.log e
    next()
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
