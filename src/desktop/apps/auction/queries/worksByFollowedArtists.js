import { graphql } from "relay-runtime"

export const worksByFollowedArtists = graphql`
  query AuctionWorksByFollowedArtistsQuery(
    $page: Int
    $size: Int
    $sale_id: ID
  ) {
    saleArtworksConnection(
      aggregations: [TOTAL]
      page: $page
      size: $size
      saleID: $sale_id
      includeArtworksByFollowedArtists: true
    ) {
      counts {
        total
      }
      edges {
        node {
          id
          sale_artwork: saleArtwork {
            lot_label: lotLabel
            current_bid: currentBid {
              display
            }
            counts {
              bidder_positions: bidderPositions
            }
            highest_bid: highestBid {
              display
            }
            opening_bid: openingBid {
              display
            }
          }
          slug
          title
          date
          sale_message: saleMessage
          is_sold: isSold
          sale {
            is_auction: isAuction
            is_closed: isClosed
          }
          artists {
            id
            name
          }
          image {
            placeholder
            url
            aspect_ratio: aspectRatio
          }
          images {
            internalID
            image_medium: url(version: "medium")
            image_versions: versions
            placeholder: resized(width: 30, height: 30, version: "tall") {
              image_url: url
            }
          }
          artists {
            id
            name
          }
          partner {
            name
          }
          href
          is_acquireable: isAcquireable
        }
      }
    }
  }
`
