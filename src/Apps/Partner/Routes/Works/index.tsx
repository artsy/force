import * as React from "react"
import { createRefetchContainer, RelayRefetchProp } from "react-relay"
import { graphql } from "react-relay"
import { Works_partner$data } from "__generated__/Works_partner.graphql"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { useRouter } from "System/Hooks/useRouter"
import { getMerchandisingPartnerSlugs } from "Apps/Partner/Utils/getMerchandisingPartnerSlugs"

interface PartnerArtworkFilterProps {
  partner: Works_partner$data
  relay: RelayRefetchProp
}

export const Artworks: React.FC<PartnerArtworkFilterProps> = ({
  partner,
  relay,
}) => {
  const { sidebar } = partner
  const { match } = useRouter()
  const filters = match?.location?.query ?? {}
  const partnerSlugs = getMerchandisingPartnerSlugs()
  const partnerId = match?.params?.partnerId

  // Preselects "Recently Added" sort option for some partners by default
  if (filters.sort === undefined && partnerSlugs.includes(partnerId)) {
    filters.sort = "-published_at"
  }

  return (
    <ArtworkFilterContextProvider
      filters={filters}
      sortOptions={[
        { text: "Recommended", value: "-decayed_merch" },
        { text: "Price (High to Low)", value: "-has_price,-prices" },
        { text: "Price (Low to High)", value: "-has_price,prices" },
        { text: "Recently Updated", value: "-partner_updated_at" },
        { text: "Recently Added", value: "-published_at" },
        { text: "Artwork Year (Descending)", value: "-year" },
        { text: "Artwork Year (Ascending)", value: "year" },
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
