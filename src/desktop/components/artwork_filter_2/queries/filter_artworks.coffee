module.exports =
  """
  query filterArtworks(
    $artist_id: String!,
    $page: Int,
    $size: Int,
    $for_sale: Boolean,
    $medium: String,
    $period: String,
    $partner_id: ID,
    $sort: String
  ) {
    filter_artworks(
      artist_id:$artist_id,
      aggregations: [TOTAL],
      page: $page,
      size: $size,
      for_sale: $for_sale,
      medium: $medium,
      period: $period,
      partner_id: $partner_id
      sort: $sort
    ){
      total
      hits {
        ... artwork_brick
      }
    }
  }

  #{require '../../artwork_brick/query.coffee'}
  """
