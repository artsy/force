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
        lot_number
        counts {
          bidder_positions
        }
        current_bid {
          display
        }
        artwork {
          _id
          href
          title
          date
          images {
            id
            image_url: url(version: ["tall"])
            image_versions: versions
            placeholder: resized(width: 30, height: 30, version: "tall") {
              image_url: url
            }
          }
          artists {
            id
            name
          }
        }
      }
    }
  }`
