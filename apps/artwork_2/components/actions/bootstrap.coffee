{ description } = require './helpers.coffee'

module.exports = (sd, { artwork }) ->
  sd.ACTIONS =
    share:
      media: artwork.images[0].url
      description: description artwork
