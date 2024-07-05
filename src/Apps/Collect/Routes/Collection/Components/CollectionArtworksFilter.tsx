import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { usePathnameComplete } from "Utils/Hooks/usePathnameComplete"
import { useRouter } from "System/Hooks/useRouter"
import { CollectionArtworksFilter_collection$data } from "__generated__/CollectionArtworksFilter_collection.graphql"
import { ColorFilter } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { MediumFilter } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { SizeFilter } from "Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WaysToBuyFilter } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { AttributionClassFilter } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { ArtworkLocationFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { ArtistNationalityFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { PartnersFilter } from "Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Join, Spacer } from "@artsy/palette"
import { AvailabilityFilter } from "Components/ArtworkFilter/ArtworkFilters/AvailabilityFilter"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

interface CollectionArtworksFilterProps {
  relay: RelayRefetchProp
  collection: CollectionArtworksFilter_collection$data
  aggregations?: SharedArtworkFilterContextProps["aggregations"]
  counts?: Counts
}

export const CollectionArtworksFilter: React.FC<CollectionArtworksFilterProps> = props => {
  const { relay, collection, aggregations, counts } = props
  const { slug, query } = collection
  const isArtistCollection = query?.artistIDs?.length === 1

  const { match } = useRouter()
  const { pathname } = usePathnameComplete()
  const { userPreferences } = useSystemContext()

  const isAvailabilityFilterEnabled = useFeatureFlag("onyx_availability-filter")

  const Filters = (
    <Join separator={<Spacer y={4} />}>
      {!isArtistCollection && <ArtistsFilter expanded />}
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      {isAvailabilityFilterEnabled && <AvailabilityFilter expanded />}
      <WaysToBuyFilter expanded />
      <MaterialsFilter expanded />
      {!isArtistCollection && <ArtistNationalityFilter expanded />}
      <ArtworkLocationFilter expanded />
      <TimePeriodFilter expanded />
      <ColorFilter expanded />
      <PartnersFilter expanded />
    </Join>
  )

  return (
    <ArtworkFilterContextProvider
      // Reset state of filter context without calling reset; which would
      // affect analytics.
      key={pathname}
      filters={match.location.query}
      sortOptions={[
        { text: "Recommended", value: "-decayed_merch" },
        {
          text: "Price (High to Low)",
          value: "sold,-has_price,-prices",
        },
        {
          text: "Price (Low to High)",
          value: "sold,-has_price,prices",
        },
        {
          text: "Recently Updated",
          value: "-partner_updated_at",
        },
        { text: "Recently Added", value: "-published_at" },
        { text: "Artwork Year (Descending)", value: "-year" },
        { text: "Artwork Year (Ascending)", value: "year" },
      ]}
      counts={counts}
      aggregations={aggregations}
      onChange={updateUrl}
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={collection}
        Filters={Filters}
        relayVariables={{
          slug,
        }}
      />
    </ArtworkFilterContextProvider>
  )
}

export const CollectionArtworksFilterRefetchContainer = createRefetchContainer(
  CollectionArtworksFilter,
  {
    collection: graphql`
      fragment CollectionArtworksFilter_collection on MarketingCollection
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        slug
        query {
          artistIDs
        }
        filtered_artworks: artworksConnection(input: $input) {
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
    query CollectionArtworksFilterQuery(
      $input: FilterArtworksInput
      $slug: String!
    ) {
      collection: marketingCollection(slug: $slug) {
        ...CollectionArtworksFilter_collection @arguments(input: $input)
      }
    }
  `
)
