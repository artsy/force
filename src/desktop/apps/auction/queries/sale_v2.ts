export function SaleV2Query(id) {
  return `
    query SaleQueryV2 {
      sale(id: "${id}") {
        _id: internalID
        id: slug
        associated_sale: associatedSale {
          cover_image: coverImage {
            cropped(width: 260, height: 110) {
              url
            }
          }
          end_at: endAt
          href
          id: slug
          is_closed: isClosed
          is_live_open: isLiveOpen
          is_preview: isPreview
          live_start_at: liveStartAt
          name
          start_at: startAt
        }
        auction_state: status
        cover_image: coverImage {
          cropped(width: 1800, height: 600, version: "wide") {
            url
          }
        }
        currency
        description
        eligible_sale_artworks_count: eligibleSaleArtworksCount
        end_at: endAt
        is_auction: isAuction
        is_closed: isClosed
        is_live_open: isLiveOpen
        is_open: isOpen
        live_start_at: liveStartAt
        name
        promoted_sale: promotedSale {
          id: slug
          name
          sale_artworks: saleArtworksConnection(first: 25) {
            edges {
              node {
                artwork {
                  id: slug
                  title
                  date
                  sale_message: saleMessage
                  is_in_auction: isInAuction
                  image {
                    placeholder
                    url
                    aspect_ratio: aspectRatio
                  }
                  artists {
                    id: slug
                    href
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
        }
        registration_ends_at: registrationEndsAt
        require_identity_verification: requireIdentityVerification
        start_at: startAt
        status
        symbol
      }
    }
  `
}
