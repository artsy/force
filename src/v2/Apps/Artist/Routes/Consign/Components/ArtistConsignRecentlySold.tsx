import { Box, Flex, Text, Spacer } from "@artsy/palette"
import * as React from "react"
import { ArtistConsignRecentlySold_artist } from "v2/__generated__/ArtistConsignRecentlySold_artist.graphql"
import { ContextModule } from "@artsy/cohesion"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { createFragmentContainer, graphql } from "react-relay"
import { SectionContainer } from "./SectionContainer"
import { Subheader } from "./Subheader"
import { extractNodes } from "v2/Utils/extractNodes"

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

      <Flex justifyContent="center" flexWrap="wrap" my={-2}>
        {artworks.map((node, i) => {
          return (
            <Box key={i} p={2} textAlign="left">
              <FillwidthItem
                artwork={node}
                imageHeight={150}
                showExtended={false}
                contextModule={ContextModule.artistRecentlySold}
              />

              {node.realizedPrice && (
                <Text variant="xs" fontWeight="bold">
                  Sold for {node.realizedPrice}
                </Text>
              )}
            </Box>
          )
        })}
      </Flex>
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
            artworksConnection {
              edges {
                node {
                  ...FillwidthItem_artwork
                  realizedPrice
                }
              }
            }
          }
        }
        name
      }
    `,
  }
)
