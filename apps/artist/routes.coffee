Artist = require '../../models/artist'

@index = (req, res) ->
  new Artist(id: req.params.id).fetch
    success: (artist) -> res.render 'template', artist: artist
    error: res.backboneError