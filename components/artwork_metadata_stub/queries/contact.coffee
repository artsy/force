module.exports = """
  fragment artwork_metadata_stub_contact on Artwork {
    _id
    href
    is_inquireable
    sale {
      is_auction
      is_live_open
      is_open
      is_closed
    }
    sale_artwork {
      highest_bid {
        display
      }
      opening_bid {
        display
      }
      counts {
        bidder_positions
      }
    }
    partner(shallow: true) {
      type
      href
    }
  }
"""
