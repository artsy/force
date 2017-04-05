{ description } = require './helpers'

module.exports = (sd, { artwork }) ->
  sd.ACTIONS =
    save:
      id: artwork.id
      _id: artwork._id

    share:
      media: if artwork.images[0]?.url then artwork.images[0].url else null
      description: description artwork

    view_in_room:
      dimensions: artwork.dimensions.cm
