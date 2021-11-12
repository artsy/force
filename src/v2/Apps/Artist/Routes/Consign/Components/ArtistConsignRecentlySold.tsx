import { Box, Flex, Sans, Spacer } from "@artsy/palette"
import * as React from "react"

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
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  if (artist.targetSupply.microfunnel.artworksConnection.edges.length === 0) {
    return null
  }

  return (
    <SectionContainer>
      <Box textAlign="center">
        <Box>
          <Subheader>Works by {artist.name} recently sold on Artsy</Subheader>

          <Spacer my={4} />

          <Flex justifyContent={["center", "center"]} flexWrap="wrap">
            {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
            {artist.targetSupply.microfunnel.artworksConnection.edges.map(
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              ({ node }, key) => {
                return (
                  <Flex
                    p={2}
                    key={key}
                    flexDirection="column"
                    style={{ textAlign: "left" }}
                  >
                    <FillwidthItem
                      artwork={node}
                      imageHeight={150}
                      showExtended={false}
                      contextModule={ContextModule.artistRecentlySold}
                    />
                    {node.realizedPrice && (
                      <Sans size="2" weight="medium">
                        Sold for {node.realizedPrice}
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
