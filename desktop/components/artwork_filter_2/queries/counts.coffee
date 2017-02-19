module.exports =
  """
  query filterArtworks(
    $artist_id: String!,
    $aggregations: [ArtworkAggregation]!
  ) {
    all: filter_artworks(
      artist_id:$artist_id,
      aggregations: $aggregations
    ){
      ... aggregations
    }
    for_sale: filter_artworks(
      artist_id:$artist_id,
      for_sale:true,
      aggregations: $aggregations
    ){
      ... aggregations
    }
  }

  fragment aggregations on FilterArtworks {
    total
    aggregations {
      slice
      counts {
        id
        name
        count
      }
    }
  }
  """
