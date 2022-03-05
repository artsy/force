import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Box,
  Button,
  ButtonSize,
  Carousel,
  Column as BaseColumn,
  ColumnProps,
  GridColumns,
  Join,
  MessageIcon,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { usePoll } from "v2/Utils/Hooks/usePoll"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useRouter } from "v2/System/Router/useRouter"
import { AuctionActiveBids_me } from "v2/__generated__/AuctionActiveBids_me.graphql"
import { AuctionLotInfoFragmentContainer } from "../Routes/Bid/Components/AuctionLotInfo"
import { Media } from "v2/Utils/Responsive"
import { themeGet } from "@styled-system/theme-get"

interface AuctionActiveBidsProps {
  me: AuctionActiveBids_me
  relay: RelayRefetchProp
}

interface LotStanding {
  lotStanding: NonNullable<AuctionActiveBidsProps["me"]["lotStandings"]>[0]
}

const AuctionActiveBids: React.FC<AuctionActiveBidsProps> = ({ me, relay }) => {
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
      <Text variant="lg" mb={2}>
        Your Active Bids
      </Text>

      <Media at="xs">
        {me?.lotStandings?.map((lotStanding, index) => {
          return (
            <>
              <Box my={4}>
                <Join separator={<Spacer mb={0.5} />}>
                  <AuctionLotInfoFragmentContainer
                    saleArtwork={lotStanding?.saleArtwork!}
                  />
                  <BidStatus lotStanding={lotStanding} />
                  <BidButton lotStanding={lotStanding} size="small" />
                </Join>
              </Box>
              <Separator />
            </>
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
              <Column justifyContent={["flex-start", "center"]}>
                <Text variant="md" fontWeight="bold">
                  {currentBid}
                </Text>

                {bidCount > 0 && (
                  <Text variant="md" color="black60" pl={0.5}>
                    ({bidCount} bid{bidCount > 1 && "s"})
                  </Text>
                )}
              </Column>
              <Column justifyContent={["flex-start", "center"]}>
                <BidStatus lotStanding={lotStanding} />
              </Column>
              <Column justifyContent={["flex-start", "flex-end"]}>
                <BidButton lotStanding={lotStanding} />
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
            sale {
              liveStartAt
              endAt
              isLiveOpen
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
  `
)

const BidStatus: React.FC<{
  lotStanding: NonNullable<AuctionActiveBidsProps["me"]["lotStandings"]>[0]
}> = ({ lotStanding }) => {
  if (!lotStanding) {
    return null
  }

  switch (true) {
    case lotStanding.isHighestBidder: {
      return (
        <Text variant="xs" color="green100" display="flex">
          <ArrowUpCircleIcon height={15} width={15} fill="green100" />
          &nbsp; Highest bid
        </Text>
      )
    }
    case lotStanding.saleArtwork?.reserveStatus === "reserve_not_met": {
      return (
        <Text variant="xs" color="red100" display="flex" alignItems="center">
          <MessageIcon height={15} width={15} fill="red100" />
          &nbsp; Reserve Not Met
        </Text>
      )
    }
    // Outbid
    default: {
      return (
        <Text variant="xs" color="red100" display="flex" alignItems="center">
          <ArrowDownCircleIcon height={15} width={15} fill="red100" />
          &nbsp; Outbid
        </Text>
      )
    }
  }
}

const BidButton: React.FC<LotStanding & { size?: ButtonSize }> = ({
  lotStanding,
  size = "medium",
}) => {
  const { router } = useRouter()

  if (!lotStanding) {
    return null
  }

  // By default, we redirect to /artwork/id on successful bid, but since we're
  // in the ActiveBids component, redirect to /auction/id (i.e., close modal)
  const redirectTo = `/auction2/${lotStanding.saleArtwork?.saleID}`
  const href = `/auction2/${lotStanding.saleArtwork?.saleID}/bid/${lotStanding?.saleArtwork?.slug}?redirectTo=${redirectTo}`

  return (
    <Button
      // @ts-ignore
      as={RouterLink}
      to={href}
      size={size}
      onClick={event => {
        event.preventDefault()

        // FIXME: Figure out why the router is doing hard jumps when
        // using query params forcing this hack.
        router.push(href)
      }}
    >
      Increase Bid
    </Button>
  )
}

const Column: React.FC<ColumnProps> = ({ children, ...rest }) => {
  return (
    <BaseColumn span={3} alignItems="center" display="flex" {...rest}>
      {children}
    </BaseColumn>
  )
}
