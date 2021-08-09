import React from "react"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/System"
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
import { formatCentsToDollars } from "v2/Apps/Consign/Routes/MarketingLanding/Utils/formatCentsToDollars"

// @ts-expect-error STRICT_NULL_CHECK
type ArtworkProps = ConsignTopArtistsQuery["response"]["targetSupply"]["microfunnel"][0]["artworksConnection"]["edges"][0]["node"] & {
  realizedPriceAverage: string
}

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
              # Generally there aren't many artworks in a microfunnel; take
              # the first 10 and then average realized price below
              artworksConnection(first: 10) {
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

        return <TopArtists {...props!} />
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

  // Iterate over microfunnel artworks and a) group into "chunks" of four for
  // displaying in rows; b) average each artwork realized price; c) shuffle the
  // display so that its a bit less static.
  const recentlySoldArtworks = chunk(
    shuffle(
      microfunnelItems.map(artwork => {
        if (artwork?.artworksConnection?.edges?.length === 0) {
          return null
        }

        // @ts-expect-error STRICT_NULL_CHECK
        const { edges } = artwork.artworksConnection

        const realizedPriceAverage = formatCentsToDollars(
          100 *
            edges
              .map(artwork =>
                Number(
                  artwork.node.realizedPrice.replace("$", "").replace(",", "")
                )
              )
              .filter(maybeArtworkPrice => !!maybeArtworkPrice)
              .reduce((avgArtworkPrice, artworkPrice, _, artworkPrices) => {
                return avgArtworkPrice + artworkPrice / artworkPrices.length
              }, 0)
        )

        // For artist info, image, etc
        const firstNode = edges[0].node

        return {
          ...firstNode,
          realizedPriceAverage: realizedPriceAverage,
        }
      })
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
                      realizedPriceAverage,
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
                              Average Sale Price: {realizedPriceAverage}
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
