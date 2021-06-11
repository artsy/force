import { Clickable, Spacer } from "@artsy/palette"
import { ArtworkSidebarCurrentBidInfo_artwork } from "v2/__generated__/ArtworkSidebarCurrentBidInfo_artwork.graphql"
import { SystemContextConsumer } from "v2/System"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { track } from "v2/System/Analytics"
import { AnalyticsSchema } from "v2/System/Analytics"
import {
  Box,
  Flex,
  LosingBidIcon,
  Separator,
  Text,
  WinningBidIcon,
} from "@artsy/palette"

export interface ArtworkSidebarCurrentBidInfoProps {
  artwork: ArtworkSidebarCurrentBidInfo_artwork
}

@track()
export class ArtworkSidebarCurrentBidInfo extends React.Component<
  ArtworkSidebarCurrentBidInfoProps
> {
  @track(() => {
    return {
      context_module: AnalyticsSchema.ContextModule.Sidebar,
      action_type: AnalyticsSchema.ActionType.Click,
      subject: AnalyticsSchema.Subject.AuctionBuyerPremium,
      type: AnalyticsSchema.Type.Link,
    }
  })
  handleClickBuyerPremium(mediator) {
    const { artwork } = this.props
    mediator &&
      mediator.trigger &&
      mediator.trigger("openAuctionBuyerPremium", {
        auctionId: artwork.sale?.internalID,
      })
  }

  render() {
    const { artwork } = this.props

    // We do not have reliable Bid info for artworks in Live sales in progress
    if (artwork.sale?.is_live_open) {
      return null
    }

    if (artwork.sale?.is_closed) {
      return (
        <>
          <Separator my={2} />

          <Text variant="subtitle" color="black100">
            Bidding closed
          </Text>
        </>
      )
    }

    // Don't display anything if there is no starting bid info
    if (!artwork.sale_artwork || !artwork.sale_artwork.current_bid) return null

    const bidsCount = artwork.sale_artwork?.counts?.bidder_positions ?? 0
    const bidsPresent = bidsCount > 0
    const bidColor =
      artwork.sale_artwork.is_with_reserve &&
      bidsPresent &&
      artwork.sale_artwork.reserve_status === "reserve_not_met"
        ? "red100"
        : "black60"

    const bidTextParts: string[] = []
    let reserveMessage = artwork.sale_artwork.reserve_message

    if (bidsPresent) {
      bidTextParts.push(bidsCount === 1 ? "1 bid" : bidsCount + " bids")
      if (reserveMessage) reserveMessage = reserveMessage.toLocaleLowerCase()
    }

    if (reserveMessage) {
      reserveMessage = reserveMessage + "."
      bidTextParts.push(reserveMessage)
    }

    const bidText = bidTextParts.join(", ")

    /**
     * NOTE: This is making an incorrect assumption that there could only ever
     * be 1 live sale with this work. When we run into that case, there is
     * likely design work to be done too, so we can adjust this then.
     */
    const myLotStanding = artwork.myLotStanding && artwork.myLotStanding[0]
    const myBidPresent = !!(myLotStanding && myLotStanding.most_recent_bid)
    const myMostRecent = myBidPresent && myLotStanding?.most_recent_bid
    const myBidWinning =
      // @ts-expect-error STRICT_NULL_CHECK
      myBidPresent && get(myLotStanding, s => s.active_bid.is_winning)
    // @ts-expect-error STRICT_NULL_CHECK
    const myMaxBid = get(myMostRecent, bid => bid.max_bid.display)

    return (
      <SystemContextConsumer>
        {({ mediator }) => (
          <>
            <Separator my={2} />

            <Flex
              width="100%"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Text variant="lg" pr={1}>
                {bidsPresent ? "Current bid" : "Starting bid"}
              </Text>

              <Flex
                flexDirection="row"
                justifyContent="right"
                alignContent="baseline"
              >
                {myBidPresent && (
                  <Box pt={0.5}>
                    {myBidWinning ? (
                      <WinningBidIcon fill="green100" />
                    ) : (
                      <LosingBidIcon fill="red100" />
                    )}
                  </Box>
                )}

                <Text variant="lg" pl={0.5}>
                  {artwork.sale_artwork?.current_bid?.display}
                </Text>
              </Flex>
            </Flex>

            {(bidText || myMaxBid) && (
              <Flex
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
              >
                {bidText && (
                  <Text variant="xs" color={bidColor} pr={1}>
                    {bidText}
                  </Text>
                )}

                {myMaxBid && (
                  <Text variant="xs" color="black60" pl={1}>
                    Your max: {myMaxBid}
                  </Text>
                )}
              </Flex>
            )}

            {artwork.sale && artwork.sale.is_with_buyers_premium && (
              <>
                <Spacer mt={1} />

                <Text variant="xs" color="black60">
                  This auction has a{" "}
                  <Clickable
                    onClick={() => this.handleClickBuyerPremium(mediator)}
                    textDecoration="underline"
                  >
                    buyer's premium
                  </Clickable>
                  .<br />
                  Shipping, taxes, and additional fees may apply.
                </Text>
              </>
            )}
          </>
        )}
      </SystemContextConsumer>
    )
  }
}

export const ArtworkSidebarCurrentBidInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarCurrentBidInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
        sale {
          is_closed: isClosed
          is_live_open: isLiveOpen
          internalID
          is_with_buyers_premium: isWithBuyersPremium
        }
        sale_artwork: saleArtwork {
          is_with_reserve: isWithReserve
          reserve_message: reserveMessage
          reserve_status: reserveStatus
          current_bid: currentBid {
            display
          }
          counts {
            bidder_positions: bidderPositions
          }
        }
        myLotStanding(live: true) {
          active_bid: activeBid {
            is_winning: isWinning
          }
          most_recent_bid: mostRecentBid {
            max_bid: maxBid {
              display
            }
          }
        }
      }
    `,
  }
)
