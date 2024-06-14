import * as React from "react"
import { createRefetchContainer, RelayRefetchProp, graphql } from "react-relay"
import { useRouter } from "System/Hooks/useRouter"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { TagArtworkFilter_tag$data } from "__generated__/TagArtworkFilter_tag.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"

interface TagArtworkFilterProps {
  tag: TagArtworkFilter_tag$data
  relay: RelayRefetchProp
}

const TagArtworkFilter: React.FC<TagArtworkFilterProps> = ({ tag, relay }) => {
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()
  const { sidebar } = tag

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      onChange={updateUrl}
      sortOptions={[
        { text: "Recommended", value: "-decayed_merch" },
        { text: "Price (High to Low)", value: "-has_price,-prices" },
        { text: "Price (Low to High)", value: "-has_price,prices" },
        { text: "Recently Updated", value: "-partner_updated_at" },
        { text: "Recently Added", value: "-published_at" },
        { text: "Artwork Year (Descending)", value: "-year" },
        { text: "Artwork Year (Ascending)", value: "year" },
      ]}
      counts={sidebar?.counts as Counts}
      aggregations={
        sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter relay={relay} viewer={tag} />
    </ArtworkFilterContextProvider>
  )
}

export const TagArtworkFilterRefetchContainer = createRefetchContainer(
  TagArtworkFilter,
  {
    tag: graphql`
      fragment TagArtworkFilter_tag on Tag
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          aggregations: { type: "[ArtworkAggregation]" }
          shouldFetchCounts: { type: "Boolean!", defaultValue: false }
        ) {
        slug
        internalID
        sidebar: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
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
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
          id
          counts {
            total(format: "0,0")
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query TagArtworkFilterQuery($slug: String!, $input: FilterArtworksInput) {
      tag(id: $slug) {
        ...TagArtworkFilter_tag @arguments(input: $input)
      }
    }
  `
)
