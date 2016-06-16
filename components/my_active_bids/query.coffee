module.exports = """
  query my_active_bids($current: Boolean!, $sale_id: String!) {
    me {
      bidder_positions(current: $current, sale_id: $sale_id) {
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
            display
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
