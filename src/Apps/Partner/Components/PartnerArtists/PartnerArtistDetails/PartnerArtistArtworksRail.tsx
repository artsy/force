import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerArtistArtworksRail_partnerArtist$data } from "__generated__/PartnerArtistArtworksRail_partnerArtist.graphql"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"

export interface PartnerArtistArtworksRailProps {
  partnerArtist: PartnerArtistArtworksRail_partnerArtist$data
  partnerId: string
  artistId: string
}

export const PartnerArtistArtworksRail: React.FC<PartnerArtistArtworksRailProps> = ({
  partnerArtist,
  partnerId,
  artistId,
}) => {
  if (!partnerArtist.artworksConnection) return null

  const artworks = extractNodes(partnerArtist.artworksConnection)

  return (
    <Rail
      title=""
      viewAllLabel="View All"
      viewAllHref={`/partner/${partnerId}/works?artist_ids%5B0%5D=${artistId}`}
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtworkFragmentContainer
            key={artwork.internalID}
            artwork={artwork}
            lazyLoad
          />
        ))
      }}
    />
  )
}

export const PartnerArtistArtworksFragmentContainer = createFragmentContainer(
  PartnerArtistArtworksRail,
  {
    partnerArtist: graphql`
      fragment PartnerArtistArtworksRail_partnerArtist on ArtistPartnerEdge {
        artworksConnection(first: 12)
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
  }
)
