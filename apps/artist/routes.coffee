Artist    = require '../../models/artist'
{ isSSL } = require '../../components/util/ssl.coffee'

@index = (req, res) ->
  new Artist(id: req.params.id).fetch
    cache  : true
    success: (artist) ->
      res.locals.sd.ARTIST = artist.toJSON()
      artist.set 'underSSL': isSSL(req)
      res.render 'index', artist: artist
    error: res.backboneError
