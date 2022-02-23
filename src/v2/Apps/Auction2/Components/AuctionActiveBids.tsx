import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  Button,
  Column as BaseColumn,
  ColumnProps,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { createRefetchContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useRouter } from "v2/System/Router/useRouter"
import { AuctionActiveBids_me } from "v2/__generated__/AuctionActiveBids_me.graphql"
import { AuctionLotInfoFragmentContainer } from "../Routes/Bid/Components/AuctionLotInfo"

interface AuctionActiveBidsProps {
  me: AuctionActiveBids_me
}

const AuctionActiveBids: React.FC<AuctionActiveBidsProps> = ({ me }) => {
  const { router } = useRouter()

  if (me?.lotStandings?.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="lg">Your Active Bids</Text>

      <Spacer my={2} />

      {me?.lotStandings?.map((lotStanding, index) => {
        if (!lotStanding) {
          return null
        }

        const currentBid = lotStanding?.saleArtwork?.currentBid?.display
        const bidCount = lotStanding?.saleArtwork?.counts?.bidderPositions ?? 0

        return (
          <GridColumns my={2} key={index}>
            <Column>
              <AuctionLotInfoFragmentContainer
                saleArtwork={lotStanding.saleArtwork!}
                hideLotInfo
              />
            </Column>
            <Column justifyContent="center">
              <Text variant="md" fontWeight="bold">
                {currentBid}
              </Text>

              {bidCount > 0 && (
                <Text variant="md" color="black60" pl={0.5}>
                  ({bidCount} bid{bidCount > 1 && "s"})
                </Text>
              )}
            </Column>
            <Column justifyContent="center">
              {lotStanding.isHighestBidder ? (
                <Text variant="xs" color="green100" display="flex">
                  <ArrowUpCircleIcon height={15} width={15} fill="green100" />
                  &nbsp; Highest bid
                </Text>
              ) : (
                <Text
                  variant="xs"
                  color="red100"
                  display="flex"
                  alignItems="center"
                >
                  <ArrowDownCircleIcon height={15} width={15} fill="red100" />
                  &nbsp; Outbid
                </Text>
              )}
            </Column>
            <Column justifyContent="flex-end">
              <Button
                // @ts-ignore
                as={RouterLink}
                to={`/auction2/${lotStanding.saleArtwork?.saleID}/bid/${lotStanding?.saleArtwork?.slug}?redirectTo=/auction2/${lotStanding.saleArtwork?.saleID}`}
                onClick={event => {
                  event.preventDefault()
                  const auctionURL = `/auction2/${lotStanding.saleArtwork?.saleID}`

                  // FIXME: Figure out why the router is doing hard jumps when
                  // using query params forcing this hack.
                  router.push(
                    `${auctionURL}/bid/${lotStanding?.saleArtwork?.slug}?redirectTo=${auctionURL}`
                  )
                }}
              >
                Increase Bid
              </Button>
            </Column>
          </GridColumns>
        )
      })}
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

const Column: React.FC<ColumnProps> = ({ children, ...rest }) => {
  return (
    <BaseColumn span={3} alignItems="center" display="flex" {...rest}>
      {children}
    </BaseColumn>
  )
}
