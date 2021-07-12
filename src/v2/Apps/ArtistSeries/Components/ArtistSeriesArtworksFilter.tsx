import { ArtistSeriesArtworksFilter_artistSeries } from "v2/__generated__/ArtistSeriesArtworksFilter_artistSeries.graphql"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { Match, RouterState, withRouter } from "found"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { MediumFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { WaysToBuyFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { TimePeriodFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { ColorFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { AttributionClassFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { PartnersFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { MaterialsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { ArtworkLocationFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { SizeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"

interface ArtistSeriesArtworksFilterProps {
  artistSeries: ArtistSeriesArtworksFilter_artistSeries
  relay: RelayRefetchProp
  match?: Match
  aggregations: SharedArtworkFilterContextProps["aggregations"]
}

const ArtistSeriesArtworksFilter: React.FC<ArtistSeriesArtworksFilterProps> = props => {
  const { match, relay, artistSeries, aggregations } = props
  const { filtered_artworks } = artistSeries

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  const Filters = (
    <>
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter />
      <ArtworkLocationFilter />
      <TimePeriodFilter />
      <ColorFilter />
      <PartnersFilter />
    </>
  )

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      aggregations={aggregations}
      sortOptions={[
        { value: "-decayed_merch", text: "Default" },
        { value: "-has_price,-prices", text: "Price (desc.)" },
        { value: "-has_price,prices", text: "Price (asc.)" },
        { value: "-partner_updated_at", text: "Recently updated" },
        { value: "-published_at", text: "Recently added" },
        { value: "-year", text: "Artwork year (desc.)" },
        { value: "year", text: "Artwork year (asc.)" },
      ]}
      onChange={updateUrl}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={artistSeries}
        relayVariables={{
          aggregations: ["TOTAL"],
          first: 20,
        }}
        Filters={Filters}
      />
    </ArtworkFilterContextProvider>
  )
}

export const ArtistSeriesArtworksFilterRefetchContainer = createRefetchContainer(
  withRouter<ArtistSeriesArtworksFilterProps & RouterState>(
    // @ts-expect-error STRICT_NULL_CHECK
    ArtistSeriesArtworksFilter
  ),
  {
    artistSeries: graphql`
      fragment ArtistSeriesArtworksFilter_artistSeries on ArtistSeries
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        filtered_artworks: filterArtworksConnection(input: $input) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ArtistSeriesArtworksFilterQuery(
      $input: FilterArtworksInput
      $slug: ID!
    ) {
      artistSeries(id: $slug) {
        ...ArtistSeriesArtworksFilter_artistSeries @arguments(input: $input)
      }
    }
  `
)
