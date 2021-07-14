import React from "react"
import { createRefetchContainer, RelayRefetchProp } from "react-relay"
import { graphql } from "relay-runtime"
import { Works_partner } from "v2/__generated__/Works_partner.graphql"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { Match, RouterState, withRouter } from "found"
import { MediumFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { MaterialsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { TimePeriodFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { ArtistNationalityFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { AttributionClassFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { ColorFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { PriceRangeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { SizeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { WaysToBuyFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { ArtistsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { useSystemContext } from "v2/System"

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
  const { relayEnvironment, user } = useSystemContext()

  const Filters = (
    <>
      <ArtistsFilter expanded relayEnvironment={relayEnvironment} user={user} />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter />
      <ArtistNationalityFilter />
      <TimePeriodFilter />
      <ColorFilter />
    </>
  )

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
      aggregations={
        partner.filtered_artworks
          ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      onChange={updateUrl}
    >
      <BaseArtworkFilter
        relay={relay}
        offset={200}
        viewer={partner as any}
        Filters={Filters}
      />
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
        ) {
        slug
        internalID
        filtered_artworks: filterArtworksConnection(
          aggregations: $aggregations
          first: 30
          input: $input
        ) {
          id
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query WorksQuery(
      $partnerId: String!
      $input: FilterArtworksInput
      $aggregations: [ArtworkAggregation]
    ) {
      partner(id: $partnerId) {
        ...Works_partner @arguments(input: $input, aggregations: $aggregations)
      }
    }
  `
)
