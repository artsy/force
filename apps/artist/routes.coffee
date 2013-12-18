Artist    = require '../../models/artist'

@index = (req, res) ->
  new Artist(id: req.params.id).fetch
    cache  : true
    success: (artist) ->
      res.locals.sd.ARTIST = artist.toJSON()
      res.render 'index', artist: artist
    error: res.backboneError
