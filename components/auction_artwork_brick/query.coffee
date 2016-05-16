module.exports = """
  fragment auction_artwork_brick on Artwork {
    ... artwork_brick

    is_sold
    is_buy_nowable
    sale_message

    sale_artwork {
      lot_number
      symbol
      estimate
      is_biddable
      current_bid {
        amount
      }
      counts {
        bidder_positions
        bids: bidder_positions(label: "bid")
      }
    }
  }
"""
