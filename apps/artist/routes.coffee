Backbone    = require 'backbone'
Artist      = require '../../models/artist'
Following   = require '../../components/follow_button/collection'

@index = (req, res) ->
  sort = req.query.sort
  sort = '' unless (new Artist).validSort(sort)
  new Artist(id: req.params.id).fetch
    cache  : true
    success: (artist) ->
      if artist.href() == req.originalUrl
        res.locals.sd.ARTIST = artist.toJSON()
        res.locals.sd.sortBy = sort
        res.render 'index', artist: artist, sortBy: sort
      else
        res.redirect artist.href()
    error: res.backboneError

@follow = (req, res) ->
  return res.redirect "/artist/#{req.params.id}" unless req.user
  token = req.user.get 'accessToken'
  Backbone.sync.editRequest = (req) -> req.set 'X-ACCESS-TOKEN' : token
  following = new Following null, kind: 'artist'
  following.follow req.params.id,
    error   : res.backboneError
    success : ->
      res.redirect "/artist/#{req.params.id}"
