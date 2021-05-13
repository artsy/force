import { FairArtworks_fair } from "v2/__generated__/FairArtworks_fair.graphql"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { MediumFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { WaysToBuyFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { GalleryFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/GalleryFilter"
import { SizeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { ColorFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { ArtistsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { useSystemContext } from "v2/Artsy"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { AttributionClassFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { getENV } from "v2/Utils/getENV"
import { PartnersFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { ArtistNationalityFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { MaterialsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { SizeFilter2 } from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter2"

interface FairArtworksFilterProps {
  fair: FairArtworks_fair
  relay: RelayRefetchProp
}

const FairArtworksFilter: React.FC<FairArtworksFilterProps> = props => {
  const { relay, fair } = props
  const { match } = useRouter()
  const { filtered_artworks, sidebarAggregations } = fair
  const { relayEnvironment, user } = useSystemContext()

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  // @ts-expect-error STRICT_NULL_CHECK
  const { counts } = filtered_artworks
  const showNewFilters = getENV("ENABLE_NEW_ARTWORK_FILTERS")

  // TODO: You shouldn't have to pass `relayEnvironment` and `user` through below.
  // For some reason, they are undefined when `useSystemContext()` is referenced
  // in <ArtistsFilter />. So, pass as props for now.
  const Filters = (
    <>
      <ArtistsFilter
        fairID={fair.internalID}
        relayEnvironment={relayEnvironment}
        user={user}
      />
      <MediumFilter expanded />
      {showNewFilters && <MaterialsFilter expanded />}
      <PriceRangeFilter />
      <AttributionClassFilter expanded />
      {showNewFilters ? <SizeFilter2 /> : <SizeFilter />}
      <WaysToBuyFilter />
      {showNewFilters && <ArtistNationalityFilter expanded />}
      <TimePeriodFilter />
      <ColorFilter />
      {showNewFilters ? <PartnersFilter /> : <GalleryFilter />}
    </>
  )

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      counts={counts}
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
        // @ts-expect-error STRICT_NULL_CHECK
        sidebarAggregations.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
    >
      <BaseArtworkFilter
        mt={6}
        relay={relay}
        viewer={fair}
        Filters={Filters}
      ></BaseArtworkFilter>
    </ArtworkFilterContextProvider>
  )
}

export const FairArtworksRefetchContainer = createRefetchContainer(
  FairArtworksFilter,
  {
    fair: graphql`
      fragment FairArtworks_fair on Fair
        @argumentDefinitions(
          shouldFetchCounts: { type: "Boolean!", defaultValue: false }
          input: { type: "FilterArtworksInput" }
          aggregations: { type: "[ArtworkAggregation]" }
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
    query FairArtworksQuery(
      $slug: String!
      $input: FilterArtworksInput
      $shouldFetchCounts: Boolean!
    ) {
      fair(id: $slug) {
        ...FairArtworks_fair
          @arguments(input: $input, shouldFetchCounts: $shouldFetchCounts)
      }
    }
  `
)
