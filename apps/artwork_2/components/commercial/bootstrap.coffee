module.exports = (sd, { artwork }) ->
  sd.COMMERCIAL =
    artwork:
      id: artwork.id
      is_acquireable: artwork.is_acquireable
      is_contactable: artwork.is_contactable

  if artwork.fair?
    sd.COMMERCIAL.fair = id: artwork.fair.id
