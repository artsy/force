module.exports = """
query {
  me {
    bidder_positions(current: true) {
      id
      display_max_bid_amount_dollars
      is_winning
      sale_artwork {
        id
        lot_number
        bidder_positions_count
        sale_id
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
