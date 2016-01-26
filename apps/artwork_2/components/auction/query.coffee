module.exports = """
  fragment auction on Artwork {
    auction: sale {
      id
      name
      is_open
      is_preview
      is_closed
      is_auction
      is_auction_promo
      is_with_buyers_premium
      sale_artwork(artwork_id: $id) {
        id
        estimate
        current_bid
        bidder_positions_count
      }
    }
  }
"""
