import React from "react"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/Artsy"
import { graphql } from "react-relay"
import { chunk, shuffle } from "lodash"
import { ConsignTopArtistsQuery } from "v2/__generated__/ConsignTopArtistsQuery.graphql"
import styled from "styled-components"

import {
  Avatar,
  Text as BaseText,
  Box,
  Flex,
  Join,
  Spacer,
} from "@artsy/palette"

type ArtworkProps = ConsignTopArtistsQuery["response"]["targetSupply"]["microfunnel"][0]["artworksConnection"]["edges"][0]["node"]

export const ConsignTopArtists: React.FC = () => {
  return (
    <>
      <Box>
        <Text textAlign={"left"} mb={2} variant="largeTitle">
          Top Artists
        </Text>
      </Box>

      <ConsignTopArtistsQueryRenderer />
    </>
  )
}

const ConsignTopArtistsQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
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

                    # FIXME: Need to average up all artist artworks
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

        return <TopArtists {...props} />
      }}
    />
  )
}

const TopArtists: React.FC<ConsignTopArtistsQuery["response"]> = props => {
  // FIXME: Add skeleton loading state
  if (!props.targetSupply) {
    return null
  }

  const microfunnelItems = props.targetSupply.microfunnel || []
  if (microfunnelItems.length === 0) {
    return null
  }

  const recentlySoldArtworks = chunk(
    shuffle(
      microfunnelItems.map(
        artwork => artwork?.artworksConnection?.edges?.[0]?.node
      )
    ),
    4
  )

  return (
    <Box textAlign="left">
      <Flex flexDirection="row" width="100%" overflow="scroll">
        <Join separator={<Spacer mr={3} />}>
          {recentlySoldArtworks.map((artworkSet, recentlySoldIndex) => {
            return (
              <Box key={recentlySoldIndex}>
                {artworkSet.map(
                  (recentlySoldArtwork: ArtworkProps, artworkSetIndex) => {
                    const {
                      image,
                      artistNames,
                      realizedPrice,
                    } = recentlySoldArtwork
                    const imageUrl = image.imageURL.replace(":version", "small")

                    return (
                      <Box key={artworkSetIndex}>
                        <Flex
                          mb={2}
                          alignItems="center"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <Box pr={1}>
                            <Avatar src={imageUrl} size="xs" />
                          </Box>
                          <Box>
                            <Text variant="text" fontWeight="bold">
                              {artistNames}
                            </Text>
                            <Text variant="text">
                              Average Sale Price: {realizedPrice}
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    )
                  }
                )}
              </Box>
            )
          })}
        </Join>
      </Flex>
    </Box>
  )
}

const Text = styled(BaseText)`
  color: white;
`
