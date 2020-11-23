module.exports = """
  query MyActiveBidsQuery($live: Boolean!, $sale_id: String) {
    me {
      lot_standings: lotStandings(live: $live, saleID: $sale_id) {
        active_bid: activeBid {
          id: internalID
        }
        is_leading_bidder: isLeadingBidder
        sale_artwork: saleArtwork {
          id: internalID
          lot_label: lotLabel
          reserve_status: reserveStatus
          counts {
            bidder_positions: bidderPositions
          }
          sale_id: saleID
          highest_bid: highestBid {
            display
          }
          sale {
            live_start_at: liveStartAt
            end_at: endAt
            is_live_open: isLiveOpen
            is_closed: isClosed
          }
          artwork {
            href
            title
            date
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
