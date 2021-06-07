import { Artist2ArtworkFilter_artist } from "v2/__generated__/Artist2ArtworkFilter_artist.graphql"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { Match } from "found"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { ZeroState } from "./ZeroState"
import { useRouter } from "v2/Artsy/Router/useRouter"

interface Artist2ArtworkFilterProps {
  aggregations: SharedArtworkFilterContextProps["aggregations"]
  artist: Artist2ArtworkFilter_artist
  relay: RelayRefetchProp
  match?: Match
}

const Artist2ArtworkFilter: React.FC<Artist2ArtworkFilterProps> = props => {
  const { match } = useRouter()
  const { relay, aggregations, artist } = props
  const { filtered_artworks } = artist
  const hasFilter = filtered_artworks && filtered_artworks.id

  if (!hasFilter) {
    return null
  }

  return (
    <ArtworkFilterContextProvider
      aggregations={aggregations}
      counts={artist.counts as any} // FIXME
      filters={match.location.query}
      onChange={updateUrl}
      sortOptions={[
        { value: "-decayed_merch", text: "Default" },
        { value: "-has_price,-prices", text: "Price (desc.)" },
        { value: "-has_price,prices", text: "Price (asc.)" },
        { value: "-partner_updated_at", text: "Recently updated" },
        { value: "-published_at", text: "Recently added" },
        { value: "-year", text: "Artwork year (desc.)" },
        { value: "year", text: "Artwork year (asc.)" },
      ]}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={artist as any} // FIXME
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
      >
        {artist.counts!.artworks === 0 && (
          <ZeroState artist={artist} isFollowed={artist.isFollowed} />
        )}
      </BaseArtworkFilter>
    </ArtworkFilterContextProvider>
  )
}

export const Artist2ArtworkFilterRefetchContainer = createRefetchContainer(
  Artist2ArtworkFilter,
  {
    artist: graphql`
      fragment Artist2ArtworkFilter_artist on Artist
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        ...FollowArtistButton_artist
        counts {
          partner_shows: partnerShows
          for_sale_artworks: forSaleArtworks
          ecommerce_artworks: ecommerceArtworks
          auction_artworks: auctionArtworks
          artworks
          has_make_offer_artworks: hasMakeOfferArtworks
        }
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
        internalID
        isFollowed
        slug
      }
    `,
  },
  graphql`
    query Artist2ArtworkFilterQuery(
      $artistID: String!
      $input: FilterArtworksInput
    ) {
      artist(id: $artistID) {
        ...Artist2ArtworkFilter_artist @arguments(input: $input)
      }
    }
  `
)
