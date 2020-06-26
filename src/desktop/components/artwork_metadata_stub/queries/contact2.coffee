module.exports = """
  fragment artwork_metadata_stub_contact on Artwork {
    _id: internalID
    href
    is_inquireable: isInquireable
    is_acquireable: isAcquireable
    sale {
      href
      is_auction: isAuction
      is_closed: isClosed
      is_live_open: isLiveOpen
      is_open: isOpen
      is_preview: isPreview
    }
    sale_artwork: saleArtwork {
      highest_bid: highestBid {
        display
      }
      opening_bid: openingBid {
        display
      }
      counts {
        bidder_positions: bidderPositions
      }
    }
    partner(shallow: true) {
      type
      href
    }
  }
"""
