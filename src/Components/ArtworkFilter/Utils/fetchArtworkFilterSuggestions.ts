import type { fetchArtworkFilterSuggestionsQuery } from "__generated__/fetchArtworkFilterSuggestionsQuery.graphql"
import { type Environment, fetchQuery, graphql } from "react-relay"

const QUERY = graphql`
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

/**
 * The parse runs a model server-side, so cap the wait rather than leaving the
 * caller's loading state hanging on Gravity's own timeout.
 */
const TIMEOUT = 1500

interface FetchArtworkFilterSuggestionsParams {
  relayEnvironment: Environment
  query: string
}

/** Returns null on failure, timeout, or no suggestion — callers keep today's behaviour. */
export const fetchArtworkFilterSuggestions = async ({
  relayEnvironment,
  query,
}: FetchArtworkFilterSuggestionsParams): Promise<ArtworkFilterSuggestion | null> => {
  try {
    const suggestion = await Promise.race([
      fetchQuery<fetchArtworkFilterSuggestionsQuery>(relayEnvironment, QUERY, {
        query,
      })
        .toPromise()
        .then(data => {
          return data?.artworkFilterSuggestions ?? null
        }),
      new Promise<null>(resolve => {
        setTimeout(() => resolve(null), TIMEOUT)
      }),
    ])

    return suggestion
  } catch (error) {
    console.error("[fetchArtworkFilterSuggestions]", error)

    return null
  }
}
