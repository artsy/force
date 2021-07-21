import React from "react"
import { createRefetchContainer, RelayRefetchProp } from "react-relay"
import { graphql } from "relay-runtime"
import { Works_partner } from "v2/__generated__/Works_partner.graphql"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { Match, RouterState, withRouter } from "found"

interface PartnerArtworkFilterProps {
  partner: Works_partner
  relay: RelayRefetchProp
  match?: Match
}

export const Artworks: React.FC<PartnerArtworkFilterProps> = ({
  partner,
  relay,
  match,
}) => {
  const { sidebar } = partner

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
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
      <BaseArtworkFilter relay={relay} offset={200} viewer={partner} />
    </ArtworkFilterContextProvider>
  )
}

export const ArtworksRefetchContainer = createRefetchContainer(
  // @ts-expect-error STRICT_NULL_CHECK
  withRouter<PartnerArtworkFilterProps & RouterState>(Artworks),
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
