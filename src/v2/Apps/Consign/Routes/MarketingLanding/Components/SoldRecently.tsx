import React from "react"
import { Box, Flex, Shelf, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SoldRecentlyQuery } from "v2/__generated__/SoldRecentlyQuery.graphql"
import { SoldRecently_targetSupply } from "v2/__generated__/SoldRecently_targetSupply.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { useTracking } from "react-tracking"
import { ContextModule, OwnerType, clickedArtworkGroup } from "@artsy/cohesion"
import { flatten, shuffle } from "lodash"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

const HEIGHT = 300

interface SoldRecentlyProps {
  targetSupply: SoldRecently_targetSupply
}

const SoldRecently: React.FC<SoldRecentlyProps> = ({ targetSupply }) => {
  const tracking = useTracking()

  if (!targetSupply.microfunnel) {
    return null
  }

  const recentlySoldArtworks = shuffle(
    flatten(
      targetSupply.microfunnel.map(microfunnel => {
        // @ts-expect-error STRICT_NULL_CHECK
        const artworks = extractNodes(microfunnel.artworksConnection)
        return artworks.filter(
          artwork => artwork.realizedPrice && artwork.realizedToEstimate
        )
      })
    )
  )

  const trackArtworkItemClick = (artwork, horizontalSlidePosition) => () => {
    tracking.trackEvent(
      clickedArtworkGroup({
        artworkID: artwork.internalID,
        artworkSlug: artwork.slug,
        contextModule: ContextModule.artworkRecentlySoldGrid,
        contextPageOwnerType: OwnerType.consign,
        horizontalSlidePosition,
      })
    )
  }

  return (
    <>
      <Text variant="xl" mb={2}>
        Sold recently on Artsy
      </Text>

      <Shelf>
        {recentlySoldArtworks.map((artwork, index) => {
          return (
            <React.Fragment key={index}>
              <FillwidthItem
                artwork={artwork}
                hidePartnerName
                hideSaleInfo
                imageHeight={HEIGHT}
                showExtended={false}
                onClick={trackArtworkItemClick(artwork, index)}
                // @ts-ignore TODO: Add to AuthContextModule
                contextModule={ContextModule.artworkRecentlySoldGrid}
              />

              <Text
                variant="xs"
                color="black60"
                display={["block", "none"]}
                mt={0.5}
              >
                Realized price
              </Text>

              <Flex flexDirection="row" alignItems="baseline">
                <Text variant="xl">{artwork.realizedPrice}</Text>

                <Box display={["none", "flex"]} alignItems="baseline">
                  <Spacer ml={0.5} />
                  <Text variant="xs" color="black60">
                    Realized price
                  </Text>
                </Box>
              </Flex>

              <Text variant="xs">
                <Box as="span" color="green100">
                  {artwork.realizedToEstimate + "×"}
                </Box>

                <Box as="span" color="black60">
                  &nbsp;estimate
                </Box>
              </Text>
            </React.Fragment>
          )
        })}
      </Shelf>
    </>
  )
}

const SoldRecentlyFragmentContainer = createFragmentContainer(SoldRecently, {
  targetSupply: graphql`
    fragment SoldRecently_targetSupply on TargetSupply {
      microfunnel {
        artworksConnection {
          edges {
            node {
              ...FillwidthItem_artwork
              realizedPrice
              realizedToEstimate
            }
          }
        }
      }
    }
  `,
})

export const SoldRecentlyQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<SoldRecentlyQuery>
      environment={relayEnvironment}
      query={graphql`
        query SoldRecentlyQuery {
          targetSupply {
            ...SoldRecently_targetSupply
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        // FIXME: Add skeleton loading state
        if (!props || !props.targetSupply) {
          return null
        }

        return (
          <SoldRecentlyFragmentContainer targetSupply={props.targetSupply} />
        )
      }}
    />
  )
}

export const tests = {
  SoldRecentlyFragmentContainer,
}
