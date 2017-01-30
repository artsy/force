export default function ArtistAggregationQuery(id) {
  return `query filterArtworks{
    filter_artworks(
      sale_id: "${id}",
      aggregations:[ARTIST],
      size: 0
    ){
      aggregations {
        counts {
          id
          count
          name
        }
      }
    }
  }`
}
