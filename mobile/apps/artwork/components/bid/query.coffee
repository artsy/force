module.exports = """
  auction: sale {
    id
    name
    auction_state
    is_open
    is_preview
    is_closed
    is_auction
    is_auction_promo
    is_with_buyers_premium
    start_at
    end_at
    live_start_at
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
