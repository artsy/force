import { EmptyLine } from "Components/Artwork/Details/Details"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { useTimer } from "Utils/Hooks/useTimer"
import { Text } from "@artsy/palette"
import { DateTime } from "luxon"
import { graphql, useFragment } from "react-relay"
import { BidTimerLine_artwork$key } from "__generated__/BidTimerLine_artwork.graphql"

interface BidTimerLineProps {
  artwork: BidTimerLine_artwork$key
}

export const BidTimerLine: React.FC<BidTimerLineProps> = ({ artwork }) => {
  const data = useFragment(bidTimerLineFragment, artwork)

  const { collectorSignals } = data
  const { lotClosesAt, registrationEndsAt, onlineBiddingExtended } =
    collectorSignals?.auction ?? {}
  const { time } = useTimer(lotClosesAt ?? "")
  const { days, hours, minutes } = time
  const { isAuctionArtwork } = useArtworkGridContext()
  const biddingEnded = lotClosesAt && new Date(lotClosesAt) <= new Date()
  const registrationEnded =
    registrationEndsAt && new Date(registrationEndsAt) <= new Date()

  const numDays = Number(days)
  const numHours = Number(hours)
  const numMinutes = Number(minutes)

  if (registrationEndsAt && !registrationEnded && !isAuctionArtwork) {
    const date = DateTime.fromISO(registrationEndsAt)
    const formattedRegistrationEndsAt = date.toFormat("MMM d")

    return (
      <Text
        variant="sm-display"
        lineHeight="22px"
        color="black100"
        alignSelf="flex-start"
        overflowEllipsis
      >
        Register by {formattedRegistrationEndsAt}
      </Text>
    )
  }

  if (!lotClosesAt || numDays > 5 || biddingEnded) {
    return <EmptyLine />
  }

  const renderLotCloseTime = [
    numDays > 0 && `${numDays}d`,
    numHours > 0 && `${numHours}h`,
    numDays === 0 && numHours === 0 && `${numMinutes}m`,
  ]
    .filter(Boolean)
    .join(" ")

  const textColor = numHours < 1 && numDays === 0 ? "red100" : "blue100"

  if (onlineBiddingExtended && isAuctionArtwork) {
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
    collectorSignals {
      auction {
        lotClosesAt
        registrationEndsAt
        onlineBiddingExtended
      }
    }
  }
`
