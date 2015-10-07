Artwork = require '../../models/artwork'

@index = (req, res, next) ->
  artwork = new Artwork id: req.params.id
  artwork.fetch cache: true, success: ->
    res.locals.sd.ARTWORK = artwork.toJSON()
    res.render 'index', artwork: artwork
