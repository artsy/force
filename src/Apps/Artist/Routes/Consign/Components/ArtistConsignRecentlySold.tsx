import { Text, Spacer, Shelf } from "@artsy/palette"
import * as React from "react"
import { ArtistConsignRecentlySold_artist$data } from "__generated__/ArtistConsignRecentlySold_artist.graphql"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"

interface ArtistConsignRecentlySoldProps {
  artist: ArtistConsignRecentlySold_artist$data
}

export const ArtistConsignRecentlySold: React.FC<ArtistConsignRecentlySoldProps> = ({
  artist,
}) => {
  const artworks = extractNodes(
    artist.targetSupply?.microfunnel?.artworksConnection
  )

  if (artworks.length === 0) {
    return null
  }

  return (
    <SectionContainer textAlign="center">
      <Subheader>Works by {artist.name} recently sold on Artsy</Subheader>

      <Spacer y={4} />

      <Shelf>
        {artworks.map(artwork => (
          <>
            <ShelfArtworkFragmentContainer
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

export const ArtistConsignRecentlySoldFragmentContainer = createFragmentContainer(
  ArtistConsignRecentlySold,
  {
    artist: graphql`
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
    `,
  }
)
