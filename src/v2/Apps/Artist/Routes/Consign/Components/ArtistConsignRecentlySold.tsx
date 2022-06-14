import { Text, Spacer, Shelf } from "@artsy/palette"
import * as React from "react"
import { ArtistConsignRecentlySold_artist } from "v2/__generated__/ArtistConsignRecentlySold_artist.graphql"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { extractNodes } from "v2/Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"

interface ArtistConsignRecentlySoldProps {
  artist: ArtistConsignRecentlySold_artist
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

      <Spacer my={4} />

      <Shelf>
        {artworks.map(artwork => (
          <>
            <ShelfArtworkFragmentContainer
              key={artwork.internalID}
              artwork={artwork}
              showExtended={false}
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
                  ...FillwidthItem_artwork
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
