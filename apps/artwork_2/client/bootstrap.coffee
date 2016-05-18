module.exports = (sd, { artwork }) ->
  sd.CLIENT =
    id: artwork.id
    context: artwork.context && artwork.context.__typename
