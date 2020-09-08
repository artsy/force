import { FairArtworks_fair } from "v2/__generated__/FairArtworks_fair.graphql"
import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { Match, RouterState, withRouter } from "found"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"

interface FairArtworksFilterProps {
  fair: FairArtworks_fair
  relay: RelayRefetchProp
  match?: Match
}

const FairArtworksFilter: React.FC<FairArtworksFilterProps> = props => {
  const { match, relay, fair } = props
  const { filtered_artworks } = fair

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
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
        viewer={fair}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
      ></BaseArtworkFilter>
    </ArtworkFilterContextProvider>
  )
}

export const FairArtworksRefetchContainer = createRefetchContainer(
  withRouter<FairArtworksFilterProps & RouterState>(FairArtworksFilter),
  {
    fair: graphql`
      fragment FairArtworks_fair on Fair
        @argumentDefinitions(
          acquireable: { type: "Boolean" }
          aggregations: { type: "[ArtworkAggregation]" }
          atAuction: { type: "Boolean" }
          color: { type: "String" }
          forSale: { type: "Boolean" }
          inquireableOnly: { type: "Boolean" }
          majorPeriods: { type: "[String]" }
          medium: { type: "String", defaultValue: "*" }
          offerable: { type: "Boolean" }
          page: { type: "Int" }
          partnerID: { type: "ID" }
          priceRange: { type: "String" }
          sizes: { type: "[ArtworkSizes]" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
        ) {
        filtered_artworks: filterArtworksConnection(
          acquireable: $acquireable
          aggregations: $aggregations
          atAuction: $atAuction
          color: $color
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
          ...ArtworkFilterArtworkGrid2_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query FairArtworksQuery(
      $acquireable: Boolean
      $aggregations: [ArtworkAggregation] = [TOTAL]
      $slug: String!
      $atAuction: Boolean
      $color: String
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
      fair(id: $slug) {
        ...FairArtworks_fair
          @arguments(
            acquireable: $acquireable
            aggregations: $aggregations
            atAuction: $atAuction
            color: $color
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

// Top-level route needs to be exported for bundle splitting in the router
export default FairArtworksRefetchContainer
