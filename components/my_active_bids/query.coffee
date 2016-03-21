module.exports = """
  query my_active_bids($current: Boolean!) {
    me {
      bidder_positions(current: $current) {
        id
        is_winning
        sale_artwork {
          id
          lot_number
          bidder_positions_count
          sale_id
          highest_bid {
            amount_cents
          }
          artwork {
            href
            title
            image {
              url(version: "square")
            }
            artist {
              name
            }
          }
        }
      }
    }
  }
"""
