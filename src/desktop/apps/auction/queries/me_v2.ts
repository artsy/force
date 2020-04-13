export function MeV2Query(sale_id) {
  return `
    query AuctionsMeQuery {
      me {
        id: internalID
        has_credit_cards: hasCreditCards
        identity_verified: identityVerified
        bidders(saleID: "${sale_id}") {
          qualified_for_bidding: qualifiedForBidding
        }

        lot_standings: lotStandings(saleID: "${sale_id}", live: true) {
          active_bid: activeBid {
            id: internalID
          }
          is_leading_bidder: isLeadingBidder
          sale_artwork: saleArtwork {
            id: slug
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
  `
}
