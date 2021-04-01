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
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/Artsy"
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

  return (
    <RouterLink
      to={`/artwork/${saleArtwork.slug}`}
      noUnderline
      onClick={() => {
        trackEvent(
          clickedArtworkGroup({
            contextModule,
            contextPageOwnerType,
            artworkID: saleArtwork.internalID,
            artworkSlug: saleArtwork.slug,
            horizontalSlidePosition,
          })
        )
      }}
    >
      <Flex width="100%">
        <Flex alignItems="center" width="100%">
          <Box backgroundColor="black60" width={50} height={50}>
            {saleArtwork.artwork.image && (
              <Image
                src={saleArtwork.artwork.image.resized.src}
                srcSet={saleArtwork.artwork.image.resized.srcSet}
              />
            )}
          </Box>
          <Spacer mr={1} />
          <Flex justifyContent="space-between" width="100%">
            <Box>
              <Text variant="text">{saleArtwork.artwork.artistNames}</Text>
              <Text variant="caption" color="black60">
                Lot {saleArtwork.position}
              </Text>
            </Box>

            <Box>
              {saleArtwork.isWatching ? (
                <>
                  <Text variant="text" display="inline-block" pr={0.3}>
                    {saleArtwork.highestBid.amount || saleArtwork.estimate}
                  </Text>
                  <Watching />
                </>
              ) : (
                <>
                  <Box style={{ whiteSpace: "nowrap" }}>
                    <Text variant="text" display="inline-block" pr={0.3}>
                      {saleArtwork.lotState.sellingPrice.display}
                    </Text>
                    <Text color="black60" display="inline-block">
                      {saleArtwork.lotState.bidCount === 1
                        ? `${saleArtwork.lotState.bidCount} bid`
                        : `${saleArtwork.lotState.bidCount} bids`}
                    </Text>
                  </Box>

                  {saleArtwork.isHighestBidder ? <HighestBid /> : <Outbid />}
                </>
              )}
            </Box>
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
            resized(width: 50, height: 50) {
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

const HighestBid: React.FC = () => (
  <Flex>
    <Box pr={0.3}>
      <ArrowUpCircleIcon fill="green100" />
    </Box>
    <Text variant="text" color="green100">
      Highest bid
    </Text>
  </Flex>
)

const Outbid: React.FC = () => (
  <Flex>
    <Box pr={0.3}>
      <ArrowDownCircleIcon fill="red100" />
    </Box>
    <Text variant="text" color="red100">
      Outbid
    </Text>
  </Flex>
)

const Watching: React.FC = () => (
  <Flex>
    <Box pr={0.3}>
      <WatchingIcon width={12} height={12} top="1px" />
    </Box>
    <Text variant="text" color="black60">
      Watching
    </Text>
  </Flex>
)
