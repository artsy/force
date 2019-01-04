module.exports = (sd, { artwork }) ->
  sd.CLIENT =
    id: artwork.id
    _id: artwork._id
    context: artwork.context
    href: artwork.href
    artists: artwork.artists
    is_acquireable: artwork.is_acquireable
    is_offerable: artwork.is_offerable