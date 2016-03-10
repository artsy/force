_ = require 'underscore'
Q = require 'bluebird-q'
fs = require 'fs'
request = require 'superagent'
Backbone = require 'backbone'
ReferrerParser = require 'referer-parser'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
{ APPLICATION_NAME } = require '../../config'
cache = require '../../lib/cache'
Artist = require '../../models/artist'
Nav = require './nav'
metaphysics = require '../../lib/metaphysics'
query = require './query'
helpers = require './view_helpers'


@index = (req, res, next) ->
  metaphysics
    query: query
    variables: artist_id: req.params.id
  .then ({artist}) ->
    nav = new Nav artist: artist

    if req.params.tab? or artist.href.replace "/artist/", "/artist_2" is res.locals.sd.CURRENT_PATH

      res.locals.sd.ARTIST = artist
      res.locals.sd.TAB = tab = req.params.tab or ''
      res.locals.sd.JSONLD = jsonLD = helpers.toJSONLD(artist)

      res.render 'index',
        viewHelpers: helpers
        artist: artist
        tab: tab
        nav: nav
        jsonLD: stringifyJSONForWeb jsonLD

    else
      res.redirect artist.href.replace "/artist/", "/artist_2"

  .catch (e) ->
    console.log e
    next()
  .done()

@tab = (req, res) =>
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res

@follow = (req, res) ->
  return res.redirect "/artist_2/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist_2/#{req.params.id}"
