import * as React from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { PartnerArtistArtworksRail_partnerArtist$data } from "__generated__/PartnerArtistArtworksRail_partnerArtist.graphql"
import { extractNodes } from "Utils/extractNodes"
import { Shelf } from "@artsy/palette"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"

export interface PartnerArtistArtworksRailProps {
  partnerArtist: PartnerArtistArtworksRail_partnerArtist$data
  partnerId: string
  artistId: string
  relay: RelayPaginationProp
}

export const PartnerArtistArtworksRail: React.FC<PartnerArtistArtworksRailProps> = ({
  partnerArtist,
  relay,
}) => {
  if (!partnerArtist.artworksConnection) return null

  const artworks = extractNodes(partnerArtist.artworksConnection)

  return (
    <Shelf>
      {artworks.map(artwork => {
        return (
          <ShelfArtworkFragmentContainer
            key={artwork.internalID}
            artwork={artwork}
            lazyLoad
          />
        )
      })}
    </Shelf>
  )
}

export const ARTISTS_ARTWORKS_QUERY = graphql`
  query PartnerArtistArtworksRailQuery(
    $partnerId: String!
    $artistId: String!
    $first: Int
    $after: String
  ) {
    partner(id: $partnerId) {
      artistsConnection(artistIDs: [$artistId], first: 1) {
        edges {
          ...PartnerArtistArtworksRail_partnerArtist
            @arguments(first: $first, after: $after)
        }
      }
    }
  }
`

export const PartnerArtistArtworksRailPaginationContainer = createPaginationContainer(
  PartnerArtistArtworksRail,
  {
    partnerArtist: graphql`
      fragment PartnerArtistArtworksRail_partnerArtist on ArtistPartnerEdge
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 12 }
          after: { type: "String" }
        ) {
        artworksConnection(first: $first, after: $after)
          @connection(key: "PartnerArtistArtworksRail_artworksConnection") {
          totalCount
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
            }
          }
        }
      }
    `,
  },
  {
    query: ARTISTS_ARTWORKS_QUERY,
    direction: "forward",
    getVariables({ partnerId, artistId }, { cursor: after }, { first }) {
      return { partnerId, artistId, after, first }
    },
  }
)
