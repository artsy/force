module.exports = """
  query my_active_bids($live: Boolean!, $sale_id: String) {
    me {
      lot_standings(live: $live, sale_id: $sale_id) {
        active_bid {
          id
        }
        is_leading_bidder
        sale_artwork {
          id
          lot_label
          reserve_status
          counts {
            bidder_positions
          }
          sale_id
          highest_bid {
            display
          }
          sale {
            live_start_at
            end_at
            is_live_open
          }
          artwork {
            href
            title
            date
            image {
              url(version: "small")
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
