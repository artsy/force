import { Aggregations } from "../ArtworkFilterContext"

export const filterArtistSlugsByAggregation = (
  slugs: string[],
  aggregations: Aggregations
) => {
  const aggregation = aggregations.find(agg => agg.slice === "ARTIST")
  const artists = aggregation?.counts ?? []
  const artistAggregationSlugs = artists.map(artist => artist.value)
  const artistSlugs = slugs.filter(slug =>
    artistAggregationSlugs.includes(slug)
  )

  return artistSlugs
}
