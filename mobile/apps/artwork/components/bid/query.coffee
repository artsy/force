module.exports = """
  auction: sale {
    auction_state
    end_at
    id
    is_auction
    is_auction_promo
    is_closed
    is_live_open
    is_open
    is_preview
    is_registration_closed
    is_with_buyers_premium
    live_start_at
    name
    registration_ends_at
    start_at
    sale_artwork(id: $id) {
      id
      estimate
      reserve_status
      current_bid {
        amount
      }
      counts {
        bidder_positions
      }
    }
  }
"""
