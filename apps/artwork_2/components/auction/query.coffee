module.exports = """
  fragment auction on Artwork {
    is_acquireable
    is_in_auction
    auction: sale {
      id
      name
      is_open
      is_preview
      is_closed
      is_auction
      is_auction_promo
      is_with_buyers_premium
      sale_artwork(id: $id) {
        id
        reserve_message
        estimate
        current_bid {
          amount
        }
        minimum_next_bid {
          amount
          cents
        }
        counts {
          bidder_positions
        }
      }
    }
  }
"""
