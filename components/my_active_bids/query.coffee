module.exports = """
    query {
      me {
        bidder_positions {
          id
          display_max_bid_amount_dollars
          highest_bid {
            id
          }
          sale_artwork {
            id
            lot_number
            bidder_positions_count
            highest_bid {
              id
            }
            artwork {
              href
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
