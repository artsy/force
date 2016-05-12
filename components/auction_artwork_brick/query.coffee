module.exports = """
  fragment auction_artwork_brick on Artwork {
    ... artwork_brick

    sale_artwork {
      symbol
      estimate
      current_bid {
        amount
      }
      counts {
        bids: bidder_positions(label: "bid")
      }
    }
  }
"""
