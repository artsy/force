module.exports =
  """
  query filterArtworks(
    $artist_id: String!
    $page: Int,
    $for_sale: Boolean,
    $medium: String,
    $period: String,
    $partner_id: ID
  ) {
    filter_artworks(
      artist_id:$artist_id,
      aggregations: [TOTAL],
      page: $page,
      for_sale: $for_sale,
      medium: $medium,
      period: $period,
      partner_id: $partner_id
    ){
      total
      hits {
        ... artwork
      }
    }
  }

  #{require './artwork.coffee'}
  """