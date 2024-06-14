import * as React from "react"
import { SearchResultsArtworks_viewer$data } from "__generated__/SearchResultsArtworks_viewer.graphql"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import { ArtworkFilter } from "Components/ArtworkFilter"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Hooks/useRouter"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SearchResultsArtworksFilters } from "Apps/Search/Components/SearchResultsArtworksFilters"
import { useEffect, useState } from "react"

interface SearchResultsRouteProps {
  viewer: SearchResultsArtworks_viewer$data
}

export const SearchResultsArtworksRoute: React.FC<SearchResultsRouteProps> = props => {
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()
  const [searchFilterKey, setSearchFilterKey] = useState(
    match.location.query.term
  )
  const { viewer } = props
  const { sidebar } = viewer

  useEffect(() => {
    // refresh artwork filter on query change
    setSearchFilterKey(match.location.query.term)
  }, [match.location.query.term])

  return (
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
  )
}

export const SearchResultsArtworksRouteFragmentContainer = createFragmentContainer(
  SearchResultsArtworksRoute,
  {
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
  }
)
