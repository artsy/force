module.exports = (sd, { artwork }) ->
  sd.CLIENT =
    id: artwork.id
    is_in_show: artwork.is_in_show
    is_in_auction: artwork.is_in_auction
