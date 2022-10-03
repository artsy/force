import { ContextModule, OwnerType } from "@artsy/cohesion"
import {
  Box,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { shuffle } from "lodash"
import { Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail"
import { useSystemContext } from "System"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RouterLink } from "System/Router/RouterLink"
import { trackHelpers } from "Utils/cohesionHelpers"
import { extractNodes } from "Utils/extractNodes"
import { SoldRecentlyOnArtsyQuery } from "__generated__/SoldRecentlyOnArtsyQuery.graphql"
import { SoldRecentlyOnArtsy_recentlySoldArtworks$data } from "__generated__/SoldRecentlyOnArtsy_recentlySoldArtworks.graphql"

interface SoldRecentlyOnArtsyProps {
  recentlySoldArtworks: SoldRecentlyOnArtsy_recentlySoldArtworks$data
}

export const SoldRecentlyOnArtsy: React.FC<SoldRecentlyOnArtsyProps> = ({
  recentlySoldArtworks,
}) => {
  const tracking = useTracking()

  if (!recentlySoldArtworks) {
    return null
  }

  const artworks = shuffle(extractNodes(recentlySoldArtworks)).filter(
    ({ artwork }) => !!artwork
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
      title="Sold Recently on Artsy"
      getItems={() => {
        return artworks.map(
          ({ artwork, highEstimate, lowEstimate, priceRealized }, index) => {
            return (
              <Fragment key={artwork!.internalID}>
                <RouterLink
                  to={artwork!.href}
                  data-testid="soldRecentlyItem"
                  display="block"
                  textDecoration="none"
                  onClick={trackArtworkItemClick(artwork, index)}
                >
                  {/* @ts-ignore RELAY UPGRADE 13 */}
                  <ShelfArtworkFragmentContainer
                    artwork={artwork!}
                    key={artwork!.internalID}
                    hideSaleInfo
                    lazyLoad
                    // @ts-ignore
                    contextModule={ContextModule.artworkRecentlySoldGrid}
                  />

                  <Flex
                    mt={4}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    color="black60"
                  >
                    <Text variant="xs">Estimate</Text>

                    <Text variant="xs">
                      {lowEstimate?.display}—{highEstimate?.display}
                    </Text>
                  </Flex>

                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    color="blue100"
                  >
                    <Text variant="xs">Sold for (incl. premium)</Text>

                    <Text variant="xs">{priceRealized?.display}</Text>
                  </Flex>
                </RouterLink>
              </Fragment>
            )
          }
        )
      }}
    />
  )
}

export const SoldRecentlyOnArtsyFragmentContainer = createFragmentContainer(
  SoldRecentlyOnArtsy,
  {
    recentlySoldArtworks: graphql`
      fragment SoldRecentlyOnArtsy_recentlySoldArtworks on RecentlySoldArtworkTypeConnection {
        edges {
          node {
            artwork {
              ...ShelfArtwork_artwork @arguments(width: 325)
              slug
              href
              internalID
            }
            lowEstimate {
              display
            }
            highEstimate {
              display
            }
            priceRealized {
              display
            }
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Sold Recently on Artsy"
      getItems={() => {
        return [...new Array(20)].map((_, i) => {
          return (
            <Box width={325} key={i}>
              <SkeletonBox width={325} height={[200, 300, 250, 275][i % 4]} />
              <SkeletonText variant="sm-display">Artist Name</SkeletonText>
              <SkeletonText variant="sm-display">Artwork Title</SkeletonText>

              <Spacer mt={4} />

              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SkeletonText variant="xs">Estimate</SkeletonText>

                <SkeletonText variant="xs">USD 100,000 - 100,000</SkeletonText>
              </Flex>

              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SkeletonText variant="xs">
                  Sold for (incl. premium)
                </SkeletonText>

                <SkeletonText variant="xs">USD 100,000</SkeletonText>
              </Flex>
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)

export const SoldRecentlyOnArtsyQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<SoldRecentlyOnArtsyQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query SoldRecentlyOnArtsyQuery {
          recentlySoldArtworks {
            ...SoldRecentlyOnArtsy_recentlySoldArtworks
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.recentlySoldArtworks) {
          return PLACEHOLDER
        }

        return (
          <SoldRecentlyOnArtsyFragmentContainer
            // @ts-ignore RELAY UPGRADE 13
            recentlySoldArtworks={props.recentlySoldArtworks}
          />
        )
      }}
    />
  )
}
