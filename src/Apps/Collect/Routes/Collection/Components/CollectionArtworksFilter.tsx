import { Join, Spacer } from "@artsy/palette"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  type Counts,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistNationalityFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { ArtworkLocationFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { AttributionClassFilter } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { AvailabilityFilter } from "Components/ArtworkFilter/ArtworkFilters/AvailabilityFilter"
import { ColorFilter } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { FramedFilter } from "Components/ArtworkFilter/ArtworkFilters/FramedFilter"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { MediumFilter } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PartnersFilter } from "Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { PriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { SignedFilter } from "Components/ArtworkFilter/ArtworkFilters/SignedFilter"
import { SizeFilter } from "Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WaysToBuyFilter } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { useFlag } from "@unleash/proxy-client-react"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { usePathnameComplete } from "Utils/Hooks/usePathnameComplete"
import type { CollectionArtworksFilter_collection$data } from "__generated__/CollectionArtworksFilter_collection.graphql"
import type * as React from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"

interface CollectionArtworksFilterProps {
  relay: RelayRefetchProp
  collection: CollectionArtworksFilter_collection$data
  aggregations?: SharedArtworkFilterContextProps["aggregations"]
  counts?: Counts
}

export const CollectionArtworksFilter: React.FC<
  React.PropsWithChildren<CollectionArtworksFilterProps>
> = props => {
  const enableShowOnlyFramedArtworksFilter = useFlag(
    "onyx_only_framed_artworks_filter",
  )
  const enableShowOnlySignedArtworksFilter = useFlag(
    "onyx_only_signed_artworks_filter",
  )

  const { relay, collection, aggregations, counts } = props
  const { slug, query } = collection
  const isArtistCollection = query?.artistIDs?.length === 1

  const { match } = useRouter()
  const { pathname } = usePathnameComplete()
  const { userPreferences } = useSystemContext()

  const Filters = (
    <Join separator={<Spacer y={4} />}>
      {!isArtistCollection && <ArtistsFilter expanded />}
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <AvailabilityFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter expanded />
      {!isArtistCollection && <ArtistNationalityFilter expanded />}
      <ArtworkLocationFilter expanded />
      <TimePeriodFilter expanded />
      <ColorFilter expanded />
      <PartnersFilter expanded />
      {enableShowOnlyFramedArtworksFilter && <FramedFilter expanded />}
      {enableShowOnlySignedArtworksFilter && <SignedFilter expanded />}
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
          ...ImmersiveView_filtered_artworks
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
  `,
)
