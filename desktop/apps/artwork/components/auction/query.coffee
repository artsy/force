module.exports = """
  fragment auction on Artwork {
    id
    href
    sale_message
    is_sold
    is_buy_nowable
    is_in_auction
    sale {
      id
      name
      end_at
      is_open
      is_live_open
      is_preview
      is_closed
      is_auction
      is_auction_promo
      is_registration_closed
      is_with_buyers_premium
      registration_ends_at
      require_bidder_approval
    }
    sale_artwork {
      id
      reserve_status
      reserve_message
      estimate
      is_biddable
      symbol
      bid_increments
      current_bid {
        display
        cents
      }
      minimum_next_bid {
        display
        cents
      }
      counts {
        bidder_positions
      }
    }
  }
"""
