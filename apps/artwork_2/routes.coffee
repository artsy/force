Q = require 'bluebird-q'
Artwork = require '../../models/artwork'

@index = (req, res, next) ->
  artwork = new Artwork id: req.params.id

  artwork.fetch(cache: true).then ->
    Q.all [
      artwork.related().sales.fetch cache: true, data: size: 1
      artwork.related().fairs.fetch cache: true, data: size: 1
      artwork.related().shows.fetch cache: true
    ]

  .then ->
    if artwork.related().sales.length
      sale = artwork.related().sales.first()
      artwork.related().saleArtwork.set artwork: artwork, sale: sale
      artwork.related().saleArtwork.fetch cache: true

  .then ->
    res.locals.sd.ARTWORK = artwork.toJSON()
    res.render 'index',
      artwork: artwork
      sale: artwork.related().sales.first()
      fair: artwork.related().fairs.first()

  .catch ->
    err = new Error 'Not Found'
    err.status = 404
    next err

  .done()
