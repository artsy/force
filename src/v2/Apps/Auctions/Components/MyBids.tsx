export const MyBidsFragmentContainer: any = () => null

// The below will eventually move to MP, so that display logic can be shared
// between Eigen and Force.
/*
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyBids_me } from "v2/__generated__/MyBids_me.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import moment from "moment-timezone"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  AlertIcon,
  Join,
  Separator,
  Spacer,
} from "@artsy/palette"
import { sortBy } from "lodash"

interface MyBidsProps {
  me: MyBids_me
}

const MyBids: React.FC<MyBidsProps> = ({ me }) => {
  const lotStandings = extractNodes(me?.auctionsLotStandingConnection)

  if (!lotStandings.length) {
    return null
  }

  const activeBids = lotStandings
    .map(getSaleInfo)
    .filter(sale => !sale.isClosed)

  const sortedActiveBids = sortBy(
    activeBids,
    "lot.saleArtwork.artwork.artistNames"
  )

  return (
    <Box>
      <Separator mb={4} />
      <Text variant="subtitle">Active Bids</Text>
      <Spacer my={2} />
      <Join separator={<Separator my={1} mb={15} />}>
        {sortedActiveBids.map(({ lot, isLiveAuction }) => {
          const {
            lot: { reserveStatus, sellingPrice, bidCount },
            saleArtwork: {
              artwork: { artistNames, href, image },
              lotLabel,
            },
          } = lot

          const reserveNotMet =
            reserveStatus === "ReserveNotMet" && !isLiveAuction

          return (
            <RouterLink to={href} noUnderline>
              <Flex alignItems="center">
                <Box pr={0.5}>
                  <Image src={image.cropped.url} />
                </Box>
                <Box width="100%">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box>
                      <Text variant="caption">Lot {lotLabel}</Text>
                      <Text variant="caption">{artistNames}</Text>
                      <Flex>
                        <Text variant="caption" mr={0.5}>
                          {sellingPrice.display}
                        </Text>
                        <Text variant="caption" color="black60">
                          ({bidCount} {bidCount === 1 ? "bid" : "bids"})
                        </Text>
                      </Flex>
                    </Box>
                    <Box textAlign="right">
                      <Box>
                        <Flex>
                          {reserveNotMet ? (
                            <ReserveNotMet />
                          ) : lot.isHighestBidder ? (
                            <HighestBid />
                          ) : (
                            <Outbid />
                          )}
                        </Flex>
                        <Spacer my={0.5} />
                        <Button variant="secondaryOutline" size="small">
                          Bid
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </RouterLink>
          )
        })}
      </Join>
    </Box>
  )
}

export const MyBidsFragmentContainer = createFragmentContainer(MyBids, {
  me: graphql`
    fragment MyBids_me on Me {
      name
      auctionsLotStandingConnection(first: 25) {
        edges {
          node {
            isHighestBidder
            lot {
              saleId
              soldStatus
              internalID
              bidCount
              reserveStatus
              soldStatus
              askingPrice: onlineAskingPrice {
                display
              }
              sellingPrice: floorSellingPrice {
                display
              }
            }
            saleArtwork {
              position
              lotLabel
              artwork {
                artistNames
                href
                image {
                  cropped(width: 70, height: 70) {
                    url
                  }
                }
              }
              sale {
                internalID
                liveStartAt
                endAt
                status
              }
            }
          }
        }
      }
    }
  `,
})

const ReserveNotMet: React.FC = () => (
  <>
    <Text variant="caption" color="black60" pr={0.3}>
      Reserve not met
    </Text>
    <AlertIcon />
  </>
)

const HighestBid: React.FC = () => (
  <>
    <Text variant="caption" color="green100" pr={0.3}>
      Highest bid
    </Text>
    <ArrowUpCircleIcon fill="green100" />
  </>
)

const Outbid: React.FC = () => (
  <>
    <Text variant="caption" color="red100" pr={0.3}>
      Outbid
    </Text>
    <ArrowDownCircleIcon fill="red100" />
  </>
)

type LotStandings = MyBids_me["auctionsLotStandingConnection"]["edges"][0]["node"]

function getSaleInfo(lot: LotStandings) {
  const { sale } = lot.saleArtwork
  const isLiveAuction = Boolean(sale.liveStartAt)
  const isClosed = sale.status === "closed"
  const isActive = Boolean(sale.status.match(/(open|preview)/).length)
  const endAt = isLiveAuction ? sale.liveStartAt : sale.endAt

  const liveBiddingStarted = () => {
    if (isLiveAuction || isClosed) {
      return false
    }
    const tz = moment.tz.guess(true)
    const now = moment().tz(tz)
    const liveStartMoment = moment(sale.liveStartAt).tz(tz)
    const started = now.isAfter(liveStartMoment)
    return started
  }

  return {
    isLiveAuction,
    isClosed,
    isActive,
    endAt,
    liveBiddingStarted,
    lot,
  }
}

*/
