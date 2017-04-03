module.exports = """
  fragment auction_artwork_brick on Artwork {
    ... artwork_brick

    is_sold
    is_buy_nowable
    sale_message

    sale_artwork {
      lot_label
      symbol
      estimate

      sale {
        is_closed
      }

      current_bid {
        display
      }

      counts {
        bidder_positions
        bids: bidder_positions(label: "bid")
      }
    }
  }
"""
