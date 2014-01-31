Artwork   = require '../../models/artwork'
Artist    = require '../../models/artist'

@index = (req, res) ->
  artwork = new Artwork id: req.params.id
  artwork.fetch
    cache: true
    error: res.backboneError
    success: (model, response, options) ->
      res.locals.sd.ARTWORK = response
      artist = new Artist artwork.get('artist')
      artist.fetch
        cache: true
        error: res.backboneError
        success: (model, response, options) ->
          res.locals.sd.ARTIST = response
          res.render 'index',
            artwork: artwork
            artist: artist
