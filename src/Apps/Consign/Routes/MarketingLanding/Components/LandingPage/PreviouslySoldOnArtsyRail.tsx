import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Flex, Skeleton, SkeletonBox, Text } from "@artsy/palette"
import { shuffle } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { Rail } from "Components/Rail/Rail"
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
    <>
      <Text mb={[0, 0, 2]} variant={["lg-display", "xl", "xxl"]}>
        Previously sold on Artsy
      </Text>
      <Rail
        title=""
        showProgress={false}
        getItems={() => {
          return artworks.map(
            (
              {
                artwork,
                lowEstimate,
                highEstimate,
                priceRealized,
                performance,
              },
              i
            ) => {
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
                      +{performance?.mid}
                    </Text>
                  </Flex>

                  <Text
                    variant={["xs", "sm-display"]}
                    color="black60"
                    overflowEllipsis
                    data-testid="previouslySoldItem-estimate"
                  >
                    Estimate {lowEstimate?.display} - {highEstimate?.display}
                  </Text>
                </SoldArtworkFragmentContainer>
              )
            }
          )
        }}
      />
    </>
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
            performance {
              mid
            }
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Text mb={[0, 0, 2]} variant={["lg-display", "xl", "xxl"]}>
      Previously sold on Artsy
    </Text>
    <Rail
      title=""
      showProgress={false}
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

              <Flex justifyContent="space-between" mb={[0.5, 1.5]} mt={0.5}>
                <SkeletonBox width={[150, 180, 210]} height={[30, 48]} />
                <SkeletonBox width={[75, 90, 105]} height={[30, 48]} />
              </Flex>

              <SkeletonBox width={200} height={20} />
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
