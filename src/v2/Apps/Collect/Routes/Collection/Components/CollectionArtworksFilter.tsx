import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { usePathnameComplete } from "v2/Utils/Hooks/usePathnameComplete"
import { useRouter } from "v2/System/Router/useRouter"
import { CollectionArtworksFilter_collection } from "v2/__generated__/CollectionArtworksFilter_collection.graphql"
import { ColorFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { MediumFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { SizeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WaysToBuyFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { AttributionClassFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { ArtworkLocationFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { ArtistNationalityFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { MaterialsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { PartnersFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { ArtistsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"

interface CollectionArtworksFilterProps {
  relay: RelayRefetchProp
  collection: CollectionArtworksFilter_collection
  aggregations?: SharedArtworkFilterContextProps["aggregations"]
  counts?: Counts
}

export const CollectionArtworksFilter: React.FC<CollectionArtworksFilterProps> = props => {
  const { relay, collection, aggregations, counts } = props
  const { slug, query } = collection
  const isArtistCollection = query?.artistIDs?.length === 1

  const { match } = useRouter()
  const { pathname } = usePathnameComplete()

  const Filters = (
    <>
      {!isArtistCollection && <ArtistsFilter expanded />}
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter />
      {!isArtistCollection && <ArtistNationalityFilter />}
      <ArtworkLocationFilter />
      <TimePeriodFilter />
      <ColorFilter />
      <PartnersFilter />
    </>
  )

  return (
    <ArtworkFilterContextProvider
      // Reset state of filter context without calling reset; which would
      // affect analytics.
      key={pathname}
      filters={match.location.query}
      sortOptions={[
        { text: "Default", value: "-decayed_merch" },
        {
          text: "Price (desc.)",
          value: "sold,-has_price,-prices",
        },
        {
          text: "Price (asc.)",
          value: "sold,-has_price,prices",
        },
        {
          text: "Recently updated",
          value: "-partner_updated_at",
        },
        { text: "Recently added", value: "-published_at" },
        { text: "Artwork year (desc.)", value: "-year" },
        { text: "Artwork year (asc.)", value: "year" },
      ]}
      counts={counts}
      aggregations={aggregations}
      onChange={updateUrl}
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
