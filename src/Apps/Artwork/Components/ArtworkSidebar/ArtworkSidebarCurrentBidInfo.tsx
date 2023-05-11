import { ArtworkSidebarCurrentBidInfo_artwork$data } from "__generated__/ArtworkSidebarCurrentBidInfo_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useTracking } from "react-tracking"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { useDialog } from "Utils/Hooks/useDialog"
import { AuctionBuyersPremiumDialogQueryRenderer } from "Components/AuctionBuyersPremiumDialog"
import styled, { keyframes } from "styled-components"
import { ArtworkSidebarBiddingClosedMessageFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarBiddingClosedMessage"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import CloseStrokeIcon from "@artsy/icons/CloseStrokeIcon"

export interface ArtworkSidebarCurrentBidInfoProps {
  artwork: ArtworkSidebarCurrentBidInfo_artwork$data
  currentBidChanged: boolean
}

// This text pulse animation is used when the current bid changes.
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`

const TextWithPulse = styled(Text)`
  animation: ${pulse} 1s infinite;
  animation-iteration-count: 1;
`

export const ArtworkSidebarCurrentBidInfo: React.FC<ArtworkSidebarCurrentBidInfoProps> = ({
  artwork,
  currentBidChanged,
}) => {
  const { trackEvent } = useTracking()

  const { dialogComponent, showDialog, hideDialog } = useDialog({
    Dialog: () => {
      if (!artwork.sale) return null

      return (
        <AuctionBuyersPremiumDialogQueryRenderer
          saleID={artwork.sale.internalID}
          onClose={hideDialog}
        />
      )
    },
    onShow: () => {
      trackEvent({
        context_module: DeprecatedAnalyticsSchema.ContextModule.Sidebar,
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject: DeprecatedAnalyticsSchema.Subject.AuctionBuyerPremium,
        type: DeprecatedAnalyticsSchema.Type.Link,
      })
    },
  })

  // We do not have reliable Bid info for artworks in Live sales in progress
  if (artwork.sale?.is_live_open) {
    return null
  }

  if (lotIsClosed(artwork.sale, artwork.sale_artwork)) {
    return (
      <ArtworkSidebarBiddingClosedMessageFragmentContainer artwork={artwork} />
    )
  }

  // Don't display anything if there is no starting bid info
  if (!artwork.sale_artwork || !artwork.sale_artwork.current_bid) {
    return null
  }

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
  const myMostRecent = myBidPresent ? myLotStanding?.most_recent_bid : null
  const myBidWinning = myBidPresent
    ? myLotStanding?.active_bid?.is_winning
    : null
  const myMaxBid = myMostRecent?.max_bid?.display

  const CurrentBid = currentBidChanged ? TextWithPulse : Text

  return (
    <>
      {dialogComponent}

      <Spacer y={2} />

      <Flex width="100%" flexDirection="row" justifyContent="space-between">
        <Text variant="lg-display" pr={1}>
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
                <CheckmarkStrokeIcon fill="green100" title="Winning Bid" />
              ) : (
                <CloseStrokeIcon fill="red100" title="Losing Bid" />
              )}
            </Box>
          )}

          {/* force a different key on each re-render so animation triggers */}
          <CurrentBid key={Math.random()} variant={"lg"} pl={0.5}>
            {artwork.sale_artwork?.current_bid?.display}
          </CurrentBid>
        </Flex>
      </Flex>

      {(bidText || myMaxBid) && (
        <Flex width="100%" flexDirection="row" justifyContent="space-between">
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
          <Spacer y={1} />

          <Text variant="xs" color="black60">
            This auction has a{" "}
            <Clickable onClick={showDialog} textDecoration="underline">
              buyer’s premium
            </Clickable>
            .<br />
            Shipping, taxes, and additional fees may apply.
          </Text>
        </>
      )}
    </>
  )
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
          endedAt
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
        ...ArtworkSidebarBiddingClosedMessage_artwork
        ...ArtworkSidebarBiddingClosedMessage_artwork
      }
    `,
  }
)
