import { FairArtworks_fair } from "v2/__generated__/FairArtworks_fair.graphql"
import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { MediumFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { WaysToBuyFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { GalleryFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/GalleryFilter"
import { SizeFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { ColorFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ColorFilter"
import { Box } from "@artsy/palette"
import { ArtistsFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { useSystemContext } from "v2/Artsy"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { AttributionClassFilter } from "v2/Components/v2/ArtworkFilter/ArtworkFilters/AttributionClassFilter"

interface FairArtworksFilterProps {
  fair: FairArtworks_fair
  relay: RelayRefetchProp
}

const FairArtworksFilter: React.FC<FairArtworksFilterProps> = props => {
  const { relay, fair } = props
  const { match } = useRouter()
  const { filtered_artworks } = fair
  const { relayEnvironment, user } = useSystemContext()

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  const { counts } = filtered_artworks

  // TODO: You shouldn't have to pass `relayEnvironment` and `user` through below.
  // For some reason, they are undefined when `useSystemContext()` is referenced
  // in <ArtistsFilter />. So, pass as props for now.
  const Filters = () => (
    <Box pr={2}>
      <ArtistsFilter
        fairID={fair.internalID}
        relayEnvironment={relayEnvironment}
        user={user}
      />
      <MediumFilter />
      <AttributionClassFilter />
      <PriceRangeFilter />
      <WaysToBuyFilter />
      <GalleryFilter />
      <SizeFilter />
      <TimePeriodFilter />
      <ColorFilter />
    </Box>
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
    >
      <BaseArtworkFilter
        mt={[0, "-1px"]}
        relay={relay}
        viewer={fair}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
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
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          artistIDs: { type: "[String]" }
          attributionClass: { type: "[String]" }
          atAuction: { type: "Boolean" }
          colors: { type: "[String]" }
          forSale: { type: "Boolean" }
          includeArtworksByFollowedArtists: { type: "Boolean" }
          inquireableOnly: { type: "Boolean" }
          majorPeriods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          partnerID: { type: "ID" }
          priceRange: { type: "String" }
          sizes: { type: "[ArtworkSizes]" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
          shouldFetchCounts: { type: "Boolean", defaultValue: false }
        ) {
        slug
        internalID
        filtered_artworks: filterArtworksConnection(
          acquireable: $acquireable
          aggregations: $aggregations
          artistIDs: $artistIDs
          attributionClass: $attributionClass
          atAuction: $atAuction
          colors: $colors
          forSale: $forSale
          includeArtworksByFollowedArtists: $includeArtworksByFollowedArtists
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
      $acquireable: Boolean
      $aggregations: [ArtworkAggregation] = [TOTAL]
      $artistIDs: [String]
      $attributionClass: [String]
      $slug: String!
      $atAuction: Boolean
      $colors: [String]
      $forSale: Boolean
      $includeArtworksByFollowedArtists: Boolean
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
      fair(id: $slug) {
        ...FairArtworks_fair
          @arguments(
            acquireable: $acquireable
            aggregations: $aggregations
            artistIDs: $artistIDs
            atAuction: $atAuction
            attributionClass: $attributionClass
            colors: $colors
            forSale: $forSale
            includeArtworksByFollowedArtists: $includeArtworksByFollowedArtists
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
