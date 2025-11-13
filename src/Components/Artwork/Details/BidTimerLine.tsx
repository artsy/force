import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { useTimer } from "Utils/Hooks/useTimer"
import { Text } from "@artsy/palette"
import type { BidTimerLine_artwork$key } from "__generated__/BidTimerLine_artwork.graphql"
import { DateTime } from "luxon"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface BidTimerLineProps {
  artwork: BidTimerLine_artwork$key
}

export const BidTimerLine: React.FC<
  React.PropsWithChildren<BidTimerLineProps>
> = ({ artwork }) => {
  const data = useFragment(bidTimerLineFragment, artwork)

  const { collectorSignals, saleArtwork } = data
  const { lotClosesAt, registrationEndsAt, onlineBiddingExtended } =
    collectorSignals?.auction ?? {}

  // Local state for webhook updates. Initialize with values coming from props.
  // Then, update these values when the websocket sends a new event.
  // Use these updated values for timer/rendering.
  const [updatedLotClosesAt, setUpdatedLotClosesAt] = useState(lotClosesAt)
  const [updatedOnlineBiddingExtended, setUpdatedOnlineBiddingExtended] =
    useState(onlineBiddingExtended)

  useAuctionWebsocket({
    lotID: saleArtwork?.lotID as string,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedLotClosesAt(extended_bidding_end_at)
      setUpdatedOnlineBiddingExtended(true)
    },
  })

  const { time, hasEnded: hasBiddingEnded } = useTimer(updatedLotClosesAt!)
  const { days, hours, minutes, seconds } = time
  const { isAuctionArtwork } = useArtworkGridContext()
  const { hasEnded: hasRegistrationEnded } = useTimer(registrationEndsAt!)

  const numDays = Number(days)
  const numHours = Number(hours)
  const numMinutes = Number(minutes)
  const numSeconds = Number(seconds)

  if (registrationEndsAt && !hasRegistrationEnded && !isAuctionArtwork) {
    const date = DateTime.fromISO(registrationEndsAt)
    const formattedRegistrationEndsAt = date.toFormat("MMM d")

    return (
      <Text
        variant="sm-display"
        lineHeight="22px"
        color="mono100"
        alignSelf="flex-start"
        overflowEllipsis
      >
        Register by {formattedRegistrationEndsAt}
      </Text>
    )
  }

  if (!lotClosesAt || numDays > 5 || hasBiddingEnded) {
    return null
  }

  const renderLotCloseTime = [
    numDays > 0 && `${numDays}d`,
    numHours > 0 && `${numHours}h`,
    numDays === 0 && numHours === 0 && numMinutes > 0 && `${numMinutes}m`,
    numDays === 0 && numHours === 0 && numMinutes <= 1 && `${numSeconds}s`,
  ]
    .filter(Boolean)
    .join(" ")

  const textColor = numHours < 1 && numDays === 0 ? "red100" : "blue100"

  if (updatedOnlineBiddingExtended && isAuctionArtwork) {
    return (
      <Text
        variant="sm-display"
        lineHeight="22px"
        color="red100"
        alignSelf="flex-start"
        overflowEllipsis
      >
        Extended, {renderLotCloseTime} left
      </Text>
    )
  }

  return (
    <Text
      variant="sm-display"
      lineHeight="22px"
      color={textColor}
      alignSelf="flex-start"
    >
      {renderLotCloseTime} left to bid
    </Text>
  )
}

const bidTimerLineFragment = graphql`
  fragment BidTimerLine_artwork on Artwork {
    saleArtwork {
      lotID
    }
    collectorSignals {
      auction {
        lotClosesAt
        registrationEndsAt
        onlineBiddingExtended
      }
    }
  }
`
