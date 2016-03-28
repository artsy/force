{ description } = require './helpers.coffee'

module.exports = (sd, { artwork }) ->
  sd.ACTIONS =
    save:
      id: artwork.id

    share:
      media: artwork.images[0].url
      description: description artwork
