Backbone    = require 'backbone'
Artist      = require '../../models/artist'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'

@index = (req, res) ->
  sort = req.query.sort
  sort = '' unless (new Artist).validSort(sort)
  new Artist(id: req.params.id).fetch
    cache  : true
    success: (artist) ->
      if artist.href() == res.locals.sd.CURRENT_PATH
        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.sortBy = sort
        res.render 'index',
          artist : artist
          sortBy : sort
          jsonLD : stringifyJSONForWeb(artist.toJSONLD())
      else
        res.redirect artist.href()
    error: res.backboneError

@follow = (req, res) ->
  return res.redirect "/artist/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist/#{req.params.id}"
