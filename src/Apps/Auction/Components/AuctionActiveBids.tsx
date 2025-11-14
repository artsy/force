import ChevronCircleDownIcon from "@artsy/icons/ChevronCircleDownIcon"
import ChevronCircleUpIcon from "@artsy/icons/ChevronCircleUpIcon"
import MessageIcon from "@artsy/icons/MessageIcon"
import {
  Column as BaseColumn,
  Box,
  Button,
  type ButtonSize,
  type ColumnProps,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { AuctionLotInfoFragmentContainer } from "Apps/Auction/Routes/Bid/Components/AuctionLotInfo"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { usePoll } from "Utils/Hooks/usePoll"
import { Media } from "Utils/Responsive"
import { getENV } from "Utils/getENV"
import type { AuctionActiveBids_me$data } from "__generated__/AuctionActiveBids_me.graphql"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"

interface AuctionActiveBidsProps {
  me: AuctionActiveBids_me$data
  relay: RelayRefetchProp
}

interface LotStanding {
  lotStanding: NonNullable<AuctionActiveBidsProps["me"]["lotStandings"]>[0]
}

const AuctionActiveBids: React.FC<
  React.PropsWithChildren<AuctionActiveBidsProps>
> = ({ me, relay }) => {
  const { match } = useRouter()

  usePoll({
    callback: () => {
      relay.refetch({ saleID: match.params.slug }, null, {}, { force: true })
    },
    intervalTime: 10000,
    key: match.params.slug,
  })

  if (me?.lotStandings?.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="lg-display" mb={2}>
        Your Active Bids
      </Text>

      <Media at="xs">
        {me?.lotStandings?.map((lotStanding, index) => {
          return (
            <Box key={index}>
              <Box my={4}>
                <Join separator={<Spacer y={0.5} />}>
                  <AuctionLotInfoFragmentContainer
                    saleArtwork={lotStanding?.saleArtwork!}
                    hideLotInfo={!!lotStanding?.saleArtwork?.sale?.isLiveOpen}
                  />
                  {!lotStanding?.saleArtwork?.sale?.isLiveOpen ? (
                    <BidStatus lotStanding={lotStanding} />
                  ) : (
                    <Spacer y={2} />
                  )}
                  <BidButton lotStanding={lotStanding} me={me} size="small" />
                </Join>
              </Box>
              <Separator />
            </Box>
          )
        })}
      </Media>
      <Media greaterThan="xs">
        {me?.lotStandings?.map((lotStanding, index) => {
          if (!lotStanding) {
            return null
          }

          const currentBid = lotStanding?.saleArtwork?.currentBid?.display
          const bidCount =
            lotStanding?.saleArtwork?.counts?.bidderPositions ?? 0

          return (
            <GridColumns my={2} key={index}>
              <Column>
                <AuctionLotInfoFragmentContainer
                  saleArtwork={lotStanding.saleArtwork!}
                  hideLotInfo
                />
              </Column>
              {lotStanding?.saleArtwork?.sale?.isLiveOpen ? (
                <Column />
              ) : (
                <Column justifyContent={["flex-start", "center"]}>
                  <Text variant="sm-display" fontWeight="bold">
                    {currentBid}
                  </Text>

                  {bidCount > 0 && (
                    <Text variant="sm-display" color="mono60" pl={0.5}>
                      ({bidCount} bid{bidCount > 1 && "s"})
                    </Text>
                  )}
                </Column>
              )}
              <Column justifyContent={["flex-start", "center"]}>
                <BidStatus lotStanding={lotStanding} />
              </Column>
              <Column justifyContent={["flex-start", "flex-end"]}>
                <BidButton lotStanding={lotStanding} me={me} />
              </Column>
            </GridColumns>
          )
        })}
      </Media>
    </>
  )
}

export const AuctionActiveBidsRefetchContainer = createRefetchContainer(
  AuctionActiveBids,
  {
    me: graphql`
      fragment AuctionActiveBids_me on Me
      @argumentDefinitions(saleID: { type: "String" }) {
        internalID
        lotStandings(saleID: $saleID, live: true) {
          isHighestBidder

          saleArtwork {
            ...AuctionLotInfo_saleArtwork
              @arguments(imageWidth: 100, imageHeight: 100)

            counts {
              bidderPositions
            }
            currentBid {
              display
            }

            slug
            lotLabel
            reserveStatus
            saleID
            highestBid {
              display
            }
            endedAt
            sale {
              slug
              endAt
              isLiveOpen
              isLiveOpenHappened
              isClosed
            }
          }
        }
      }
    `,
  },
  graphql`
    query AuctionActiveBidsRefetchQuery($saleID: String!) {
      me {
        ...AuctionActiveBids_me @arguments(saleID: $saleID)
      }
    }
  `,
)

const BidStatus: React.FC<
  React.PropsWithChildren<{
    lotStanding: NonNullable<AuctionActiveBidsProps["me"]["lotStandings"]>[0]
  }>
> = ({ lotStanding }) => {
  if (!lotStanding) {
    return null
  }

  switch (true) {
    case lotStanding.saleArtwork?.sale?.isLiveOpen: {
      return (
        <Text variant="xs" color="blue100" display="flex">
          Bidding live now
        </Text>
      )
    }
    case lotStanding.saleArtwork?.sale?.isLiveOpenHappened: {
      return (
        <Text variant="xs" color="mono60" display="flex">
          Live auction
        </Text>
      )
    }
    case lotStanding.isHighestBidder: {
      return (
        <Text variant="xs" color="green100" display="flex">
          <ChevronCircleUpIcon
            height={15}
            width={15}
            mt={"2px"}
            fill="green100"
          />
          &nbsp; Highest bid
        </Text>
      )
    }
    case lotStanding.saleArtwork?.reserveStatus === "reserve_not_met": {
      return (
        <Text variant="xs" color="red100" display="flex" alignItems="center">
          <MessageIcon height={15} width={15} mt={"2px"} fill="red100" />
          &nbsp; Reserve Not Met
        </Text>
      )
    }
    // Outbid
    default: {
      return (
        <Text variant="xs" color="red100" display="flex" alignItems="center">
          <ChevronCircleDownIcon
            height={15}
            width={15}
            mt={"2px"}
            fill="red100"
          />
          &nbsp; Outbid
        </Text>
      )
    }
  }
}

const BidButton: React.FC<
  React.PropsWithChildren<
    LotStanding & {
      me: AuctionActiveBidsProps["me"]
      size?: ButtonSize
    }
  >
> = ({ lotStanding, me, size = "large" }) => {
  const { router } = useRouter()
  const { tracking } = useAuctionTracking()

  const saleArtwork = lotStanding?.saleArtwork
  const sale = saleArtwork?.sale
  if (!sale) return null

  if (!!saleArtwork.endedAt) {
    return (
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        width="50%"
      >
        <Text variant="sm-display" color="mono100">
          Bidding Closed
        </Text>
      </Box>
    )
  }

  if (!!sale.isLiveOpen) {
    return (
      <Button
        // @ts-ignore
        as={RouterLink}
        to={`${getENV("PREDICTION_URL")}/${sale.slug}/login`}
        width="50%"
        variant="primaryBlack"
      >
        Enter live bidding
      </Button>
    )
  }

  // By default, we redirect to /artwork/id on successful bid, but since we're
  // in the ActiveBids component, redirect to /auction/id (i.e., close modal)
  const redirectTo = `/auction/${saleArtwork.saleID}`
  const href = `/auction/${saleArtwork.saleID}/bid/${saleArtwork.slug}?redirectTo=${redirectTo}`

  return (
    <Button
      // @ts-ignore
      as={RouterLink}
      to={href}
      size={size}
      width="50%"
      disabled={!!saleArtwork.endedAt}
      onClick={event => {
        event.preventDefault()

        tracking.clickedActiveBid({
          artworkSlug: saleArtwork.slug,
          saleSlug: sale.slug,
          userID: me.internalID,
        })

        // FIXME: Figure out why the router is doing hard jumps when
        // using query params forcing this hack.
        router.push(href)
      }}
    >
      Increase Bid
    </Button>
  )
}

const Column: React.FC<React.PropsWithChildren<ColumnProps>> = ({
  children,
  ...rest
}) => {
  return (
    <BaseColumn span={3} alignItems="center" display="flex" {...rest}>
      {children}
    </BaseColumn>
  )
}
