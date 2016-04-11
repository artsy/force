module.exports = (sd, { artwork }) ->
  sd.INQUIRY = artwork: id: artwork.id

  if artwork.fair?
    sd.INQUIRY.fair = id: artwork.fair.id
