module.exports = (sd, { artwork }) ->
  if artwork.is_in_auction
    sd.AUCTION =
      id: artwork.sale.id
      minimum_next_bid: artwork.sale.sale_artwork.minimum_next_bid
