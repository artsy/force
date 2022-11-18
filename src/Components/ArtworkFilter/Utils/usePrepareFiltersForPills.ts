import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { filterArtistSlugsByAggregation } from "./filterArtistSlugsByAggregation"

export const usePrepareFiltersForPills = () => {
  const {
    filters,
    aggregations,
    followedArtists = [],
  } = useArtworkFilterContext()
  let preparedFilters = filters ?? {}
  const { artistIDs = [] } = preparedFilters

  // Display all the followed artists that can be extracted from ARTIST aggregation
  // when "Artists You Follow" is selected
  if (preparedFilters?.includeArtworksByFollowedArtists) {
    const followedArtistSlugs = followedArtists.map(artist => artist.slug)
    const artistSlugs = filterArtistSlugsByAggregation(
      followedArtistSlugs,
      aggregations ?? []
    )

    preparedFilters = {
      ...preparedFilters,
      artistIDs: artistSlugs,
    }
  }

  // Display only those artists who are present in ARTIST aggregation
  if (artistIDs.length > 0) {
    const artistSlugs = filterArtistSlugsByAggregation(
      artistIDs,
      aggregations ?? []
    )

    preparedFilters = {
      ...preparedFilters,
      artistIDs: artistSlugs,
    }
  }

  return preparedFilters
}
