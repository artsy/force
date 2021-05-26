import { ArtistArtworkFilter_artist } from "v2/__generated__/ArtistArtworkFilter_artist.graphql"
import { Works_artist } from "v2/__generated__/Works_artist.graphql"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { Match, RouterState, withRouter } from "found"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { ZeroState } from "./ZeroState"
import { getENV } from "v2/Utils/getENV"

interface ArtistArtworkFilterProps {
  artist: ArtistArtworkFilter_artist
  relay: RelayRefetchProp
  sidebarAggregations: Works_artist["sidebarAggregations"]
  match?: Match
}

const ArtistArtworkFilter: React.FC<ArtistArtworkFilterProps> = props => {
  const { match, relay, artist, sidebarAggregations } = props
  const { filtered_artworks } = artist
  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  const sortOptions = [
    { value: "-has_price,-prices", text: "Price (desc.)" },
    { value: "-has_price,prices", text: "Price (asc.)" },
    { value: "-partner_updated_at", text: "Recently updated" },
    { value: "-published_at", text: "Recently added" },
    { value: "-year", text: "Artwork year (desc.)" },
    { value: "year", text: "Artwork year (asc.)" },
  ]

  const defaultSortValue =
    getENV("DECAYED_MERCH_V3") === "experiment"
      ? "-decayed_merch_v2"
      : "-decayed_merch"

  sortOptions.unshift({ value: defaultSortValue, text: "Default" })

  const initialFilters = {
    ...(match && match.location.query),
    sort: defaultSortValue,
  }

  return (
    <ArtworkFilterContextProvider
      filters={initialFilters}
      sortOptions={sortOptions}
      // @ts-expect-error STRICT_NULL_CHECK
      aggregations={sidebarAggregations.aggregations as any}
      // @ts-expect-error STRICT_NULL_CHECK
      counts={artist.counts}
      onChange={updateUrl}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={artist}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
      >
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {artist.counts.artworks === 0 && (
          <ZeroState artist={artist} is_followed={artist.is_followed} />
        )}
      </BaseArtworkFilter>
    </ArtworkFilterContextProvider>
  )
}

export const ArtistArtworkFilterRefetchContainer = createRefetchContainer(
  // @ts-expect-error STRICT_NULL_CHECK
  withRouter<ArtistArtworkFilterProps & RouterState>(ArtistArtworkFilter),
  {
    artist: graphql`
      fragment ArtistArtworkFilter_artist on Artist
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        is_followed: isFollowed
        counts {
          partner_shows: partnerShows
          for_sale_artworks: forSaleArtworks
          ecommerce_artworks: ecommerceArtworks
          auction_artworks: auctionArtworks
          artworks
          has_make_offer_artworks: hasMakeOfferArtworks
        }
        slug
        internalID
        filtered_artworks: filterArtworksConnection(input: $input, first: 30) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ArtistArtworkFilterQuery(
      $artistID: String!
      $input: FilterArtworksInput
    ) {
      artist(id: $artistID) {
        ...ArtistArtworkFilter_artist @arguments(input: $input)
      }
    }
  `
)
