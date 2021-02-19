import { ShowArtworks_show } from "v2/__generated__/ShowArtworks_show.graphql"
import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { MediumFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { WaysToBuyFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { SizeFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { ColorFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ColorFilter"
import { Box, BoxProps } from "@artsy/palette"
import { useRouter } from "v2/Artsy/Router/useRouter"

interface ShowArtworksFilterProps extends BoxProps {
  show: ShowArtworks_show
  relay: RelayRefetchProp
}

const ShowArtworksFilter: React.FC<ShowArtworksFilterProps> = ({
  relay,
  show,
  ...rest
}) => {
  const { match } = useRouter()
  const { filtered_artworks } = show

  const hasFilter = filtered_artworks && filtered_artworks.id

  if (!hasFilter) return null

  const Filters = () => (
    <Box pr={2}>
      <MediumFilter />
      <PriceRangeFilter />
      <WaysToBuyFilter />
      <SizeFilter />
      <TimePeriodFilter />
      <ColorFilter />
    </Box>
  )

  // Inject custom default sort into artwork filter.
  const filters = {
    sort: "partner_show_position",
    ...(match && match.location.query),
  }

  return (
    <ArtworkFilterContextProvider
      filters={filters}
      sortOptions={[
        { text: "Gallery Curated", value: "partner_show_position" },
        { text: "Default", value: "-decayed_merch" },
        { text: "Price (desc.)", value: "-has_price,-prices" },
        { text: "Price (asc.)", value: "-has_price,prices" },
        { text: "Recently updated", value: "-partner_updated_at" },
        { text: "Recently added", value: "-published_at" },
        { text: "Artwork year (desc.)", value: "-year" },
        { text: "Artwork year (asc.)", value: "year" },
      ]}
      onChange={updateUrl}
    >
      <BaseArtworkFilter
        mt={0}
        relay={relay}
        viewer={show}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
        Filters={Filters}
        {...rest}
      />
    </ArtworkFilterContextProvider>
  )
}

export const ShowArtworksRefetchContainer = createRefetchContainer(
  ShowArtworksFilter,
  {
    show: graphql`
      fragment ShowArtworks_show on Show
        @argumentDefinitions(
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          atAuction: { type: "Boolean" }
          colors: { type: "[String]" }
          forSale: { type: "Boolean" }
          inquireableOnly: { type: "Boolean" }
          majorPeriods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          partnerID: { type: "ID" }
          priceRange: { type: "String" }
          sizes: { type: "[ArtworkSizes]" }
          sort: { type: "String", defaultValue: "-decayed_merch" }
        ) {
        filtered_artworks: filterArtworksConnection(
          acquireable: $acquireable
          aggregations: $aggregations
          atAuction: $atAuction
          colors: $colors
          forSale: $forSale
          inquireableOnly: $inquireableOnly
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          partnerID: $partnerID
          priceRange: $priceRange
          sizes: $sizes
          first: 20
          after: ""
          sort: $sort
        ) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ShowArtworksQuery(
      $acquireable: Boolean
      $aggregations: [ArtworkAggregation] = [TOTAL]
      $slug: String!
      $atAuction: Boolean
      $colors: [String]
      $forSale: Boolean
      $inquireableOnly: Boolean
      $majorPeriods: [String]
      $medium: String
      $offerable: Boolean
      $page: Int
      $partnerID: ID
      $priceRange: String
      $sizes: [ArtworkSizes]
      $sort: String
    ) {
      show(id: $slug) {
        ...ShowArtworks_show
          @arguments(
            acquireable: $acquireable
            aggregations: $aggregations
            atAuction: $atAuction
            colors: $colors
            forSale: $forSale
            inquireableOnly: $inquireableOnly
            majorPeriods: $majorPeriods
            medium: $medium
            offerable: $offerable
            page: $page
            partnerID: $partnerID
            priceRange: $priceRange
            sizes: $sizes
            sort: $sort
          )
      }
    }
  `
)
