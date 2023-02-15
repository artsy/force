import { ContextModule, OwnerType } from "@artsy/cohesion"
import {
  Box,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { shuffle } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { Rail } from "Components/Rail"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { trackHelpers } from "Utils/cohesionHelpers"
import { extractNodes } from "Utils/extractNodes"
import { PreviouslySoldOnArtsyRailQuery } from "__generated__/PreviouslySoldOnArtsyRailQuery.graphql"
import { PreviouslySoldOnArtsyRail_recentlySoldArtworks$data } from "__generated__/PreviouslySoldOnArtsyRail_recentlySoldArtworks.graphql"
import { SoldArtworkFragmentContainer } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SoldArtwork"

interface PreviouslySoldOnArtsyRailProps {
  recentlySoldArtworks: PreviouslySoldOnArtsyRail_recentlySoldArtworks$data
}

export const PreviouslySoldOnArtsyRail: React.FC<PreviouslySoldOnArtsyRailProps> = ({
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
      title="Previously sold on Artsy"
      showProgress={false}
      getItems={() => {
        return artworks.map(
          ({ artwork, lowEstimate, highEstimate, priceRealized }, i) => {
            if (!artwork) return <></>

            return (
              <SoldArtworkFragmentContainer
                key={artwork.internalID}
                artwork={artwork}
                lazyLoad
                data-testid="previouslySoldItem"
                onClick={trackArtworkItemClick(artwork, i)}
                // FIXME:
                contextModule={ContextModule.artworkRecentlySoldGrid as any}
              >
                <Flex justifyContent="space-between" mb={[0.5, 1.5]}>
                  <Text variant={["lg-display", "xl"]} overflowEllipsis>
                    {priceRealized?.display}
                  </Text>
                  <Text
                    variant={["lg-display", "xl"]}
                    color="green100"
                    overflowEllipsis
                  >
                    123%
                  </Text>
                </Flex>

                <Text
                  variant={["xs", "sm-display"]}
                  color="black60"
                  overflowEllipsis
                >
                  Estimate {lowEstimate?.display} - {highEstimate?.display}
                </Text>
              </SoldArtworkFragmentContainer>
            )
          }
        )
      }}
    />
  )
}

export const PreviouslySoldOnArtsyRailFragmentContainer = createFragmentContainer(
  PreviouslySoldOnArtsyRail,
  {
    recentlySoldArtworks: graphql`
      fragment PreviouslySoldOnArtsyRail_recentlySoldArtworks on RecentlySoldArtworkTypeConnection {
        edges {
          node {
            artwork {
              ...SoldArtwork_artwork
              slug
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
      title="Previously sold on Artsy"
      getItems={() => {
        return [...new Array(20)].map((_, i) => {
          return (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              width="100%"
            >
              <SkeletonBox width={[305, 362, 420]} height={[380, 495]} />

              <Flex justifyContent="space-between" mb={[0.5, 1.5]}>
                <Text variant={["lg-display", "xl"]} overflowEllipsis>
                  $100,000
                </Text>
                <Text
                  variant={["lg-display", "xl"]}
                  color="green100"
                  overflowEllipsis
                >
                  123%
                </Text>
              </Flex>

              <Text
                variant={["xs", "sm-display"]}
                color="black60"
                overflowEllipsis
              >
                Estimate $100,000–100,000
              </Text>

              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SkeletonText variant="xs" overflowEllipsis>
                  Estimate
                </SkeletonText>

                <SkeletonText variant="xs" overflowEllipsis>
                  USD 100,000–100,000
                </SkeletonText>
              </Flex>
              {/*
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SkeletonText variant="xs" overflowEllipsis>
                  Sold for (incl. premium)
                </SkeletonText>

                <SkeletonText variant="xs" overflowEllipsis>
                  USD 100,000
                </SkeletonText>
              </Flex> */}
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)

export const PreviouslySoldOnArtsyRailQueryRenderer: React.FC = () => {
  return (
    <SystemQueryRenderer<PreviouslySoldOnArtsyRailQuery>
      lazyLoad
      query={graphql`
        query PreviouslySoldOnArtsyRailQuery {
          recentlySoldArtworks {
            ...PreviouslySoldOnArtsyRail_recentlySoldArtworks
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
          <PreviouslySoldOnArtsyRailFragmentContainer
            recentlySoldArtworks={props.recentlySoldArtworks}
          />
        )
      }}
    />
  )
}
