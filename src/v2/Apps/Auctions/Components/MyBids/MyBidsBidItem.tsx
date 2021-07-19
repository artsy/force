import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyBidsBidItem_saleArtwork } from "v2/__generated__/MyBidsBidItem_saleArtwork.graphql"
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Box,
  Flex,
  Image,
  Spacer,
  Text,
  WatchingIcon,
} from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/System"
import { clickedArtworkGroup } from "@artsy/cohesion"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"

interface MyBidsBidItemProps {
  horizontalSlidePosition: number
  saleArtwork: MyBidsBidItem_saleArtwork
}

export const MyBidsBidItem: React.FC<MyBidsBidItemProps> = ({
  horizontalSlidePosition,
  saleArtwork,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const contextModule = tabTypeToContextModuleMap.myBids
  const image = saleArtwork.artwork?.image?.resized

  return (
    <RouterLink
      to={`/artwork/${saleArtwork.slug}`}
      noUnderline
      onClick={() => {
        trackEvent(
          clickedArtworkGroup({
            contextModule,
            // @ts-expect-error STRICT_NULL_CHECK
            contextPageOwnerType,
            artworkID: saleArtwork.internalID,
            artworkSlug: saleArtwork.slug,
            horizontalSlidePosition,
          })
        )
      }}
    >
      <Flex alignItems="center" width="100%">
        <Box backgroundColor="black60" flexShrink={0}>
          {image && (
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width={55}
              height={55}
              lazyLoad
            />
          )}
        </Box>

        <Spacer mr={1} />

        <Flex flex={1} minWidth={0}>
          <Box overflow="hidden" pr={1}>
            <Text variant="xs" overflowEllipsis>
              {saleArtwork.artwork?.artistNames}
            </Text>

            <Text variant="xs" color="black60">
              Lot {saleArtwork.position}
            </Text>
          </Box>

          <Flex flex={1} flexDirection="column" alignItems="flex-end">
            {saleArtwork.isWatching ? (
              <>
                <Text variant="xs" overflowEllipsis>
                  {saleArtwork.highestBid?.amount || saleArtwork.estimate}
                </Text>

                <Text
                  variant="xs"
                  color="black60"
                  overflowEllipsis
                  display="flex"
                  alignItems="center"
                >
                  <WatchingIcon height={12} width={10} />
                  &nbsp; Watching
                </Text>
              </>
            ) : (
              <>
                <Text variant="xs" overflowEllipsis>
                  {saleArtwork.lotState?.sellingPrice?.display}{" "}
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
                    <ArrowUpCircleIcon height={15} width={15} fill="green100" />
                    &nbsp; Highest bid
                  </Text>
                ) : (
                  <Text
                    variant="xs"
                    color="red100"
                    overflowEllipsis
                    alignItems="center"
                  >
                    <ArrowDownCircleIcon height={15} width={15} fill="red100" />
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
            resized(width: 55, height: 55) {
              src
              srcSet
            }
          }
        }
        estimate
        highestBid {
          amount
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
        position
        slug
      }
    `,
  }
)
