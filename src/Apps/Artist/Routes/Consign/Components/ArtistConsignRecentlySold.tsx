import { Text, Spacer, Shelf } from "@artsy/palette"
import * as React from "react"
import { ArtistConsignRecentlySold_artist$key } from "__generated__/ArtistConsignRecentlySold_artist.graphql"
import { ContextModule } from "@artsy/cohesion"
import { graphql, useFragment } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtwork } from "Components/Artwork/ShelfArtwork"

interface ArtistConsignRecentlySoldProps {
  artist: ArtistConsignRecentlySold_artist$key
}

export const ArtistConsignRecentlySold: React.FC<ArtistConsignRecentlySoldProps> = ({
  artist,
}) => {
  const artistData = useFragment(ARTIST_FRAGMENT, artist)
  const artworks = extractNodes(
    artistData.targetSupply?.microfunnel?.artworksConnection
  )

  if (artworks.length === 0) {
    return null
  }

  return (
    <SectionContainer textAlign="center">
      <Subheader>Works by {artistData.name} recently sold on Artsy</Subheader>

      <Spacer y={4} />

      <Shelf>
        {artworks.map(artwork => (
          <>
            <ShelfArtwork
              key={artwork.internalID}
              artwork={artwork}
              contextModule={ContextModule.artistRecentlySold}
            />

            {artwork.realizedPrice && (
              <Text variant="xs" fontWeight="bold" textAlign="left">
                Sold for {artwork.realizedPrice}
              </Text>
            )}
          </>
        ))}
      </Shelf>
    </SectionContainer>
  )
}

const ARTIST_FRAGMENT = graphql`
  fragment ArtistConsignRecentlySold_artist on Artist {
    name
    targetSupply {
      microfunnel {
        artworksConnection {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
              realizedPrice
            }
          }
        }
      }
    }
  }
`
