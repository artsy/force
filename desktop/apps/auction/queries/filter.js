export const filterQuery = `
  query filterSaleArtworks(
    $aggregations: [SaleArtworkAggregation],
    $page: Int,
    $size: Int,
    $estimate_range: String,
    $gene_ids: [String],
    $artist_ids: [String],
    $sale_id: ID,
    $sort: String,
    $include_artworks_by_followed_artists: Boolean
  ){
    filter_sale_artworks(
      aggregations: $aggregations,
      page: $page,
      size: $size,
      estimate_range: $estimate_range,
      gene_ids: $gene_ids,
      artist_ids: $artist_ids,
      sale_id: $sale_id,
      sort: $sort,
      include_artworks_by_followed_artists: $include_artworks_by_followed_artists
    ){
      aggregations {
        slice
        counts {
          id
          name
          count
        }
      }
      counts {
        total
        followed_artists
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
          _id
          id
          date
          href
          title
          is_sold
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
