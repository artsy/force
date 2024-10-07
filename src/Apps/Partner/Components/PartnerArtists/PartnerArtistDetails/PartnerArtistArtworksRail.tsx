import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { PartnerArtistArtworksRail_partnerArtist$key } from "__generated__/PartnerArtistArtworksRail_partnerArtist.graphql"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtwork } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"

export interface PartnerArtistArtworksRailProps {
  partnerArtist: PartnerArtistArtworksRail_partnerArtist$key
  partnerId: string
  artistId: string
}

export const PartnerArtistArtworksRail: React.FC<PartnerArtistArtworksRailProps> = ({
  partnerArtist,
  partnerId,
  artistId,
}) => {
  const partnerArtistData = useFragment(PARTNER_ARTIST_FRAGMENT, partnerArtist)
  if (!partnerArtistData.artworksConnection) return null

  const artworks = extractNodes(partnerArtistData.artworksConnection)

  return (
    <Rail
      title=""
      viewAllLabel="View All"
      viewAllHref={`/partner/${partnerId}/works?artist_ids%5B0%5D=${artistId}`}
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtwork key={artwork.internalID} artwork={artwork} lazyLoad />
        ))
      }}
    />
  )
}

const PARTNER_ARTIST_FRAGMENT = graphql`
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
`
