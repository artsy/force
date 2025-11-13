import { SearchResultsArtworksFilters } from "Apps/Search/Components/SearchResultsArtworksFilters"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import { ArtworkFilter } from "Components/ArtworkFilter"
import type {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { SearchResultsArtworks_viewer$data } from "__generated__/SearchResultsArtworks_viewer.graphql"
import type * as React from "react"
import { useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

const SEARCH_PATH_NAME = "/search"

interface SearchResultsRouteProps {
  viewer: SearchResultsArtworks_viewer$data
}

export const SearchResultsArtworksRoute: React.FC<
  React.PropsWithChildren<SearchResultsRouteProps>
> = props => {
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()
  const [searchFilterKey, setSearchFilterKey] = useState(
    match.location.query.term
  )
  const { viewer } = props
  const { sidebar } = viewer

  useEffect(() => {
    const term = match.location.query.term

    // This is to avoid remounting the component when moving away from the search page (e.g. by clicking on a search result).
    if (match.location.pathname !== SEARCH_PATH_NAME || !term) return

    // refresh artwork filter on query change
    setSearchFilterKey(term)
  }, [match.location.query.term, match.location.pathname])

  return (
    <ArtworkGridContextProvider>
      <ArtworkFilter
        key={searchFilterKey}
        mt={4}
        viewer={viewer}
        filters={match.location.query}
        onChange={updateUrl}
        ZeroState={ZeroState}
        aggregations={
          sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
        }
        counts={sidebar?.counts as Counts}
        sortOptions={[
          { value: "-decayed_merch", text: "Recommended" },
          { value: "-has_price,-prices", text: "Price (High to Low)" },
          { value: "-has_price,prices", text: "Price (Low to High)" },
          { value: "-partner_updated_at", text: "Recently Updated" },
          { value: "-published_at", text: "Recently Added" },
          { value: "-year", text: "Artwork Year (Descending)" },
          { value: "year", text: "Artwork Year (Ascending)" },
        ]}
        Filters={<SearchResultsArtworksFilters />}
        userPreferredMetric={userPreferences?.metric}
      />
    </ArtworkGridContextProvider>
  )
}

export const SearchResultsArtworksRouteFragmentContainer =
  createFragmentContainer(SearchResultsArtworksRoute, {
    viewer: graphql`
      fragment SearchResultsArtworks_viewer on Viewer
      @argumentDefinitions(
        input: { type: "FilterArtworksInput" }
        sidebarInput: { type: "FilterArtworksInput" }
        shouldFetchCounts: { type: "Boolean!", defaultValue: false }
      ) {
        sidebar: artworksConnection(first: 1, input: $sidebarInput) {
          counts @include(if: $shouldFetchCounts) {
            followedArtists
          }
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
        ...ArtworkFilter_viewer @arguments(input: $input)
      }
    `,
  })
