export const filterQuery = `
  query filterArtworks(
    $aggregations: [ArtworkAggregation],
    $page: Int,
    $size: Int,
    $estimate_range: String,
    $gene_id: String,
    $gene_ids: [String],
    $artist_ids: [String],
    $sale_id: ID,
    $medium: String,
    $sort: String,
    $include_artworks_by_followed_artists: Boolean
  ){
    filter_artworks(
      aggregations: $aggregations,
      page: $page,
      size: $size,
      estimate_range: $estimate_range,
      gene_id: $gene_id,
      gene_ids: $gene_ids,
      artist_ids: $artist_ids,
      sale_id: $sale_id,
      medium: $medium,
      sort: $sort,
      include_artworks_by_followed_artists: $include_artworks_by_followed_artists
    ){
      total
      followed_artists_total
      aggregations {
        slice
        counts {
          id
          name
          count
        }
      }
      hits {
        id
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
        sale_artwork {
          lot_number
          counts {
            bidder_positions
          }
          current_bid {
            display
          }
        }
      }
    }
  }`
