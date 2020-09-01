import { Box, Flex, Sans, Spacer } from "@artsy/palette"
import React from "react"

import { ArtistConsignRecentlySold_artist } from "v2/__generated__/ArtistConsignRecentlySold_artist.graphql"

import { ContextModule } from "@artsy/cohesion"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"

interface ArtistConsignRecentlySoldProps {
  artist: ArtistConsignRecentlySold_artist
}

export const ArtistConsignRecentlySold: React.FC<ArtistConsignRecentlySoldProps> = ({
  artist,
}) => {
  if (!artist.targetSupply.microfunnel.artworks) {
    return null
  }

  return (
    <SectionContainer>
      <Box textAlign="center">
        <Box>
          <Subheader>Works by {artist.name} recently sold on Artsy</Subheader>

          <Spacer my={4} />

          <Flex justifyContent={["center", "center"]} flexWrap="wrap">
            {artist.targetSupply.microfunnel.artworks.map(
              ({ artwork, realizedPrice }, key) => {
                return (
                  <Flex
                    p={2}
                    key={key}
                    flexDirection="column"
                    style={{ textAlign: "left" }}
                  >
                    <FillwidthItem
                      artwork={artwork}
                      imageHeight={150}
                      showExtended={false}
                      contextModule={ContextModule.artistRecentlySold}
                    />
                    {realizedPrice && (
                      <Sans size="2" weight="medium">
                        Sold for {realizedPrice}
                      </Sans>
                    )}
                  </Flex>
                )
              }
            )}
          </Flex>
        </Box>
      </Box>
    </SectionContainer>
  )
}

export const ArtistConsignRecentlySoldFragmentContainer = createFragmentContainer(
  ArtistConsignRecentlySold,
  {
    artist: graphql`
      fragment ArtistConsignRecentlySold_artist on Artist {
        targetSupply {
          microfunnel {
            artworks {
              artwork {
                ...FillwidthItem_artwork
              }
              realizedPrice
            }
          }
        }

        name
      }
    `,
  }
)
