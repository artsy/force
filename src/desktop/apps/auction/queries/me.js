export default function MeQuery(sale_id, live = true) {
  return `{
    me {
      id
      has_qualified_credit_cards
      bidders(sale_id: "${sale_id}") {
        qualified_for_bidding
      }

      lot_standings(sale_id: "${sale_id}", live: ${live}) {
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
            is_closed
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
  }`
}
