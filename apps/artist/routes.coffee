_ = require 'underscore'
Q = require 'q'
fs = require 'graceful-fs'
{ resolve } = require 'path'
Backbone = require 'backbone'
Artist = require '../../models/artist'
{ stringifyJSONForWeb } = require '../../components/util/json'

@tab = (req, res) =>
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res

@index = (req, res) ->
  artist = new Artist id: req.params.id

  Q.allSettled([
    artist.fetch(cache: true)
    artist.related().artworks.fetch(cache: true, data: sort: '-iconicity', published: true, size: 7)
  ]).spread((artistRequest, artworksRequest) ->
    if artistRequest.state is 'rejected'
      res.backboneError(artist, artistRequest.reason.res)
    else
      if req.params.tab? or artist.href() is res.locals.sd.CURRENT_PATH
        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.TAB = req.params.tab
        res.render 'index',
          artist: artist
          jsonLD: stringifyJSONForWeb(artist.toJSONLD())
          tab: req.params.tab
      else
        res.redirect artist.href()

  ).done()

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
