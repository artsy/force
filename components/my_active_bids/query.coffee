module.exports = """
  query my_active_bids($current: Boolean!) {
    me {
      bidder_positions(current: $current) {
        id
        is_winning
        sale_artwork {
          id
          lot_number
          counts {
            bidder_positions
          }
          sale_id
          highest_bid {
            amount
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
