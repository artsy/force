export const filterQuery = `
  query AuctionFilterSaleArtworks(
    $aggregations: [SaleArtworkAggregation]
    $page: Int
    $size: Int
    $estimate_range: String
    $gene_ids: [String]
    $artist_ids: [String]
    $sale_id: ID
    $sort: String
    $include_artworks_by_followed_artists: Boolean
  ) {
    saleArtworksConnection(
      aggregations: $aggregations
      page: $page
      size: $size
      estimateRange: $estimate_range
      geneIDs: $gene_ids
      artistIDs: $artist_ids
      saleID: $sale_id
      sort: $sort
      includeArtworksByFollowedArtists: $include_artworks_by_followed_artists
    ) {
      aggregations {
        slice
        counts {
          id: value
          name
          count
        }
      }
      counts {
        total
        followed_artists: followedArtists
      }
      edges {
        node {
          saleArtwork {
            lot_label: lotLabel
            counts {
              bidder_positions: bidderPositions
            }
            current_bid: currentBid {
              display
            }
          }
          id: slug
          _id: internalID
          sale_message: saleMessage
          slug
          date
          href
          title
          is_sold: isSold
          image {
            url
          }
          images {
            _id: internalID
            aspect_ratio: aspectRatio
            image_url: url(version: "large")
            image_large: url(version: "large")
            image_medium: url(version: "medium")
            image_versions: versions
            placeholder: resized(width: 30, height: 30, version: "tall") {
              image_url: url
            }
          }
          artist {
            name
          }
          artists {
            id
            name
          }
        }
      }
    }
  }
`
