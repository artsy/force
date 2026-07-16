import type { fetchArtworkFilterSuggestionsQuery } from "__generated__/fetchArtworkFilterSuggestionsQuery.graphql"
import { type Environment, fetchQuery, graphql } from "react-relay"

const query = graphql`
  query fetchArtworkFilterSuggestionsQuery($query: String!) {
    artworkFilterSuggestions(query: $query) {
      keyword
      fellOpen
      filters {
        geneIDs
        sizes
        colors
        attributionClass
        artistNationalities
        majorPeriods
        priceRange
        framed
        signed
        forSale
        acquireable
        offerable
        atAuction
        inquireable
      }
      dropped {
        field
        value
      }
    }
  }
`

export type ArtworkFilterSuggestion = NonNullable<
  fetchArtworkFilterSuggestionsQuery["response"]["artworkFilterSuggestions"]
>

// Runs the natural-language parse on demand (button click). Returns null on any
// failure so the caller can fall back to a plain keyword search.
export async function fetchArtworkFilterSuggestions(
  relayEnvironment: Environment,
  searchQuery: string,
): Promise<ArtworkFilterSuggestion | null> {
  try {
    const data = await fetchQuery<fetchArtworkFilterSuggestionsQuery>(
      relayEnvironment,
      query,
      { query: searchQuery },
    ).toPromise()

    return data?.artworkFilterSuggestions ?? null
  } catch (error) {
    console.error("[fetchArtworkFilterSuggestions]", error)
    return null
  }
}
