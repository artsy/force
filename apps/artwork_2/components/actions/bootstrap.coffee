{ description } = require './helpers.coffee'

module.exports = (sd, { artwork }) ->
  sd.ACTIONS =
    save:
      id: artwork.id
      _id: artwork._id

    share:
      media: artwork.images[0].url
      description: description artwork

    view_in_room:
      dimensions: artwork.dimensions.cm
