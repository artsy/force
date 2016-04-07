module.exports = (sd, { artwork }) ->
  if auction = artwork.auction
    { sale_artwork } = auction

    sd.AUCTION =
      id: auction.id
      minimum_next_bid: sale_artwork.minimum_next_bid
