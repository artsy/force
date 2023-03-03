import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerArtistArtworksRail_partnerArtist$data } from "__generated__/PartnerArtistArtworksRail_partnerArtist.graphql"
import { extractNodes } from "Utils/extractNodes"
import { Shelf } from "@artsy/palette"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"

export interface PartnerArtistArtworksRailProps {
  partnerArtist: PartnerArtistArtworksRail_partnerArtist$data
  partnerId: string
  artistId: string
}

export const PartnerArtistArtworksRail: React.FC<PartnerArtistArtworksRailProps> = ({
  partnerArtist,
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

export const PartnerArtistArtworksFragmentContainer = createFragmentContainer(
  PartnerArtistArtworksRail,
  {
    partnerArtist: graphql`
      fragment PartnerArtistArtworksRail_partnerArtist on ArtistPartnerEdge {
        artworksConnection(first: 99)
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
