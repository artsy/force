import * as React from "react"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SoldRecentlyQuery } from "v2/__generated__/SoldRecentlyQuery.graphql"
import { SoldRecently_targetSupply$data } from "v2/__generated__/SoldRecently_targetSupply.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { useTracking } from "react-tracking"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { flatten, shuffle } from "lodash"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { trackHelpers } from "v2/Utils/cohesionHelpers"
import { Rail } from "v2/Components/Rail"

const HEIGHT = 300

interface SoldRecentlyProps {
  targetSupply: SoldRecently_targetSupply$data
}

const SoldRecently: React.FC<SoldRecentlyProps> = ({ targetSupply }) => {
  const tracking = useTracking()

  if (!targetSupply.microfunnel) {
    return null
  }

  const recentlySoldArtworks = shuffle(
    flatten(
      targetSupply.microfunnel.map(microfunnel => {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const artworks = extractNodes(microfunnel.artworksConnection)
        return artworks.filter(
          artwork => artwork.realizedPrice && artwork.realizedToEstimate
        )
      })
    )
  )

  const trackArtworkItemClick = (artwork, horizontalSlidePosition) => () => {
    tracking.trackEvent(
      trackHelpers.clickedArtworkGroup(
        ContextModule.artworkRecentlySoldGrid,
        OwnerType.consign,
        artwork.internalID,
        artwork.slug,
        horizontalSlidePosition
      )
    )
  }

  return (
    <Rail
      title="Sold recently on Artsy"
      getItems={() => {
        return recentlySoldArtworks.map((artwork, index) => {
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
        })
      }}
    />
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
      lazyLoad
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
