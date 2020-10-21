import React from "react"
import { Box, Flex, Join, Separator, Spacer, Text } from "@artsy/palette"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/Artsy"
import { graphql } from "react-relay"
import { shuffle } from "lodash"

import { ConsignTopArtistsQuery } from "v2/__generated__/ConsignTopArtistsQuery.graphql"

export const ConsignTopArtists: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box>
      <Box>
        <Text variant="title">Top artists</Text>
        <Separator />
      </Box>

      <Box>
        <QueryRenderer<ConsignTopArtistsQuery>
          environment={relayEnvironment}
          variables={{}}
          query={graphql`
            query ConsignTopArtistsQuery {
              targetSupply {
                microfunnel {
                  artworksConnection(first: 1) {
                    edges {
                      node {
                        slug
                        internalID
                        href
                        artistNames
                        image {
                          imageURL
                        }
                        realizedPrice
                      }
                    }
                  }
                }
              }
            }
          `}
          render={({ props, error }) => {
            // FIXME: Error handling
            if (error) {
              return null
            }
            // FIXME: Add skeleton loading state
            if (!props) {
              return null
            }

            const microfunnelItems = props.targetSupply.microfunnel || []
            if (microfunnelItems.length === 0) {
              return null
            }

            const recentlySoldArtworks = shuffle(
              microfunnelItems.map(x => x?.artworksConnection?.edges?.[0]?.node)
            )

            return (
              <Box>
                <Flex flexDirection="row">
                  <Join separator={<Spacer mr={0.5} />}>
                    {recentlySoldArtworks.map((recentlySoldArtwork, index) => {
                      return <Box key={index}>artwork</Box>
                    })}
                  </Join>
                </Flex>
              </Box>
            )
          }}
        />
      </Box>
    </Box>
  )
}
