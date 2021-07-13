import React from "react"
import { createRefetchContainer, RelayRefetchProp, graphql } from "react-relay"
import { useRouter } from "v2/System/Router/useRouter"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { TagArtworkFilter_tag } from "v2/__generated__/TagArtworkFilter_tag.graphql"
import { useSystemContext } from "v2/System"
import { MediumFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { WaysToBuyFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { SizeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { MaterialsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { ColorFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { ArtistsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { AttributionClassFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { ArtistNationalityFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { ArtworkLocationFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { PartnersFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PartnersFilter"

interface TagArtworkFilterProps {
  tag: TagArtworkFilter_tag
  relay: RelayRefetchProp
}

const TagArtworkFilter: React.FC<TagArtworkFilterProps> = ({ tag, relay }) => {
  const { match } = useRouter()
  const { relayEnvironment, user } = useSystemContext()
  const { filtered_artworks, sidebarAggregations } = tag

  const Filters = (
    <>
      <ArtistsFilter relayEnvironment={relayEnvironment} user={user} expanded />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter />
      <ArtistNationalityFilter />
      <ArtworkLocationFilter />
      <TimePeriodFilter />
      <ColorFilter />
      <PartnersFilter />
    </>
  )

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      onChange={updateUrl}
      sortOptions={[
        { text: "Default", value: "-decayed_merch" },
        { text: "Price (desc.)", value: "-has_price,-prices" },
        { text: "Price (asc.)", value: "-has_price,prices" },
        { text: "Recently updated", value: "-partner_updated_at" },
        { text: "Recently added", value: "-published_at" },
        { text: "Artwork year (desc.)", value: "-year" },
        { text: "Artwork year (asc.)", value: "year" },
      ]}
      counts={filtered_artworks?.counts as Counts}
      aggregations={
        sidebarAggregations?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
    >
      <BaseArtworkFilter relay={relay} viewer={tag} Filters={Filters} />
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
        sidebarAggregations: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
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
          counts @include(if: $shouldFetchCounts) {
            followedArtists
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
