export const worksByFollowedArtists = `
  query filterSaleArtworks(
    $page: Int,
    $size: Int,
    $sale_id: ID
  ){
    filter_sale_artworks(
      aggregations: [TOTAL],
      page: $page,
      size: $size,
      sale_id: $sale_id,
      include_artworks_by_followed_artists: true
    ){
      counts {
        total
      }
      hits {
        id
        lot_label
        counts {
          bidder_positions
        }
        current_bid {
          display
        }
        artwork {
          id
          title
          date
          sale_message
          is_in_auction
          is_sold
          artists {
            id
            name
          }
          image {
            placeholder
            url
            aspect_ratio
          }
          images {
            id
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
          is_purchasable
          is_acquireable
        }
      }
    }
  }`
