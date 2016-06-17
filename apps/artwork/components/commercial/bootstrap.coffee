module.exports = (sd, { artwork }) ->
  sd.COMMERCIAL =
    artwork:
      id: artwork.id
      is_acquireable: artwork.is_acquireable
      is_inquireable: artwork.is_inquireable

  if artwork.fair?
    sd.COMMERCIAL.artwork.fair = id: artwork.fair.id
