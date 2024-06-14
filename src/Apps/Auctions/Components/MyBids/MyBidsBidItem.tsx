import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyBidsBidItem_saleArtwork$data } from "__generated__/MyBidsBidItem_saleArtwork.graphql"
import { Box, Flex, Image, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { trackHelpers } from "Utils/cohesionHelpers"
import { tabTypeToContextModuleMap } from "Apps/Auctions/Utils/tabTypeToContextModuleMap"
import ChevronCircleUpIcon from "@artsy/icons/ChevronCircleUpIcon"
import ChevronCircleDownIcon from "@artsy/icons/ChevronCircleDownIcon"

interface MyBidsBidItemProps {
  horizontalSlidePosition: number
  saleArtwork: MyBidsBidItem_saleArtwork$data
}

export const MyBidsBidItem: React.FC<MyBidsBidItemProps> = ({
  horizontalSlidePosition,
  saleArtwork,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const contextModule = tabTypeToContextModuleMap.myBids
  const image = saleArtwork.artwork?.image?.cropped

  return (
    <RouterLink
      display="block"
      to={`/artwork/${saleArtwork.slug}`}
      textDecoration="none"
      onClick={() => {
        trackEvent(
          trackHelpers.clickedArtworkGroup(
            contextModule,
            contextPageOwnerType!,
            saleArtwork.internalID,
            saleArtwork.slug,
            horizontalSlidePosition
          )
        )
      }}
    >
      <Flex alignItems="center" width="100%">
        <Box backgroundColor="black60" flexShrink={0}>
          {image && (
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width={image.width}
              height={image.height}
              lazyLoad
            />
          )}
        </Box>

        <Spacer x={1} />

        <Flex flex={1} minWidth={0}>
          <Box overflow="hidden" pr={1}>
            <Text variant="xs" overflowEllipsis>
              {saleArtwork.artwork?.artistNames}
            </Text>

            <Text variant="xs" color="black60">
              Lot {saleArtwork.lotLabel}
            </Text>
          </Box>

          <Flex flex={1} flexDirection="column" alignItems="flex-end">
            {saleArtwork.isWatching ? (
              <>
                <Text variant="xs" overflowEllipsis>
                  {saleArtwork.currentBid?.display || saleArtwork.estimate}
                </Text>

                <Text
                  variant="xs"
                  color="black60"
                  overflowEllipsis
                  display="flex"
                  alignItems="center"
                >
                  {/* FIXME: Replace with BookmarkFillIcon (?) */}
                  {/* <WatchingIcon height={12} width={10} /> */}
                  &nbsp; Watching
                </Text>
              </>
            ) : (
              <>
                <Text variant="xs" overflowEllipsis>
                  {saleArtwork.currentBid?.display || saleArtwork.estimate}{" "}
                  <Box as="span" color="black60">
                    (
                    {saleArtwork.lotState?.bidCount === 1
                      ? `${saleArtwork.lotState.bidCount} bid`
                      : `${saleArtwork.lotState?.bidCount} bids`}
                    )
                  </Box>
                </Text>

                {saleArtwork.isHighestBidder ? (
                  <Text
                    variant="xs"
                    color="green100"
                    overflowEllipsis
                    display="flex"
                  >
                    <ChevronCircleUpIcon
                      height={15}
                      width={15}
                      fill="green100"
                    />
                    &nbsp; Highest bid
                  </Text>
                ) : (
                  <Text
                    variant="xs"
                    color="red100"
                    overflowEllipsis
                    alignItems="center"
                  >
                    <ChevronCircleDownIcon
                      height={15}
                      width={15}
                      fill="red100"
                    />
                    &nbsp; Outbid
                  </Text>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </RouterLink>
  )
}

export const MyBidsBidItemFragmentContainer = createFragmentContainer(
  MyBidsBidItem,
  {
    saleArtwork: graphql`
      fragment MyBidsBidItem_saleArtwork on SaleArtwork {
        artwork {
          artistNames
          image {
            cropped(width: 55, height: 55) {
              src
              srcSet
              width
              height
            }
          }
        }
        estimate
        currentBid {
          display
        }
        internalID
        isHighestBidder
        isWatching
        lotState {
          bidCount
          sellingPrice {
            display
          }
        }
        lotLabel
        slug
      }
    `,
  }
)
