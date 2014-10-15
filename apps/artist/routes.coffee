fs = require 'graceful-fs'
{ resolve } = require 'path'
Backbone = require 'backbone'
Artist = require '../../models/artist'
{ stringifyJSONForWeb } = require '../../components/util/json'

@tab = (req, res) =>
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res

@index = (req, res) ->
  sort = req.query.sort
  sort = '' unless (new Artist).validSort(sort)
  new Artist(id: req.params.id).fetch
    cache: true
    success: (artist) ->
      if req.params.tab? or artist.href() is res.locals.sd.CURRENT_PATH
        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.TAB = req.params.tab
        res.locals.sd.SORT_BY = sort
        res.render 'index',
          artist: artist
          jsonLD: stringifyJSONForWeb(artist.toJSONLD())
          tab: req.params.tab
      else
        res.redirect artist.href()
    error: res.backboneError

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
  res.header 'Content-Type', 'application/json; charset=utf-8'
  res.write data
  res.end()
