import * as React from "react"
import { createRefetchContainer, RelayRefetchProp } from "react-relay"
import { graphql } from "relay-runtime"
import { Works_partner } from "__generated__/Works_partner.graphql"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { ActiveFilterPills } from "Components/SavedSearchAlert/Components/ActiveFilterPills"
import { useRouter } from "System/Router/useRouter"

interface PartnerArtworkFilterProps {
  partner: Works_partner
  relay: RelayRefetchProp
}

export const Artworks: React.FC<PartnerArtworkFilterProps> = ({
  partner,
  relay,
}) => {
  const { sidebar } = partner
  const { match } = useRouter()
  const filters = match?.location?.query ?? {}

  // Preselects "Recently added" sort option for artsy-2 partner by default
  if (match?.params?.partnerId === "artsy-2" && filters.sort === undefined) {
    filters.sort = "-published_at"
  }

  return (
    <ArtworkFilterContextProvider
      filters={filters}
      sortOptions={[
        { text: "Default", value: "-decayed_merch" },
        { text: "Price (desc.)", value: "-has_price,-prices" },
        { text: "Price (asc.)", value: "-has_price,prices" },
        { text: "Recently updated", value: "-partner_updated_at" },
        { text: "Recently added", value: "-published_at" },
        { text: "Artwork year (desc.)", value: "-year" },
        { text: "Artwork year (asc.)", value: "year" },
      ]}
      onChange={updateUrl}
      aggregations={
        sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      counts={sidebar?.counts as Counts}
    >
      <BaseArtworkFilter
        relay={relay}
        offset={200}
        viewer={partner}
        FilterPillsSection={<ActiveFilterPills />}
      />
    </ArtworkFilterContextProvider>
  )
}

export const ArtworksRefetchContainer = createRefetchContainer(
  Artworks,
  {
    partner: graphql`
      fragment Works_partner on Partner
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          aggregations: { type: "[ArtworkAggregation]" }
          shouldFetchCounts: { type: "Boolean!", defaultValue: false }
        ) {
        slug
        internalID
        sidebar: filterArtworksConnection(
          first: 1
          aggregations: $aggregations
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
    query WorksQuery($partnerId: String!, $input: FilterArtworksInput) {
      partner(id: $partnerId) {
        ...Works_partner @arguments(input: $input)
      }
    }
  `
)
