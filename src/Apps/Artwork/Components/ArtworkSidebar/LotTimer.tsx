import { getSaleOrLotTimerInfo } from "Utils/getSaleOrLotTimerInfo"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { useTimer } from "Utils/Hooks/useTimer"
import { Box, Spacer, Text } from "@artsy/palette"
import type { LotTimer_saleArtwork$data } from "__generated__/LotTimer_saleArtwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarAuctionProgressBar } from "./ArtworkSidebarAuctionProgressBar"

export interface LotTimerProps {
  saleArtwork: LotTimer_saleArtwork$data
}

export const LotTimer: React.FC<React.PropsWithChildren<LotTimerProps>> = ({
  saleArtwork,
}) => {
  const { endAt, extendedBiddingEndAt, lotID } = saleArtwork

  const startAt = saleArtwork.sale?.startAt
  const extendedBiddingPeriodMinutes =
    saleArtwork.sale?.extendedBiddingPeriodMinutes
  const extendedBiddingIntervalMinutes =
    saleArtwork.sale?.extendedBiddingIntervalMinutes

  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] =
    React.useState(biddingEndAt)
  const [isExtended, setIsExtended] = React.useState(false)

  useAuctionWebsocket({
    lotID: lotID!,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
      setIsExtended(true)
    },
  })

  const { hasEnded, time, hasStarted } = useTimer(
    updatedBiddingEndAt!,
    startAt!
  )

  if (!endAt) {
    return null
  }

  const timerInfo = getSaleOrLotTimerInfo(time, {
    hasStarted,
    lotsAreClosing: false,
    isSaleInfo: false,
    extendedBiddingEndAt: isExtended
      ? updatedBiddingEndAt
      : extendedBiddingEndAt,
  })

  return (
    <Box textAlign={"center"}>
      <Text variant="sm-display" color={"blue100"}>
        {!hasEnded && <Text color={timerInfo.color}>{timerInfo.copy}</Text>}
      </Text>

      {extendedBiddingPeriodMinutes && extendedBiddingIntervalMinutes && (
        <ArtworkSidebarAuctionProgressBar
          time={time}
          extendedBiddingPeriodMinutes={extendedBiddingPeriodMinutes}
          extendedBiddingIntervalMinutes={extendedBiddingIntervalMinutes}
          hasBeenExtended={!!extendedBiddingEndAt}
        />
      )}

      <Text variant="sm-display" color={"mono60"}>
        {saleArtwork.formattedStartDateTime}
      </Text>

      {extendedBiddingPeriodMinutes && (
        <>
          <Spacer y={1} />
          <Text variant="xs" color={"mono60"}>
            *Closure times may be extended to accommodate last-minute bids
          </Text>
        </>
      )}
    </Box>
  )
}

export const LotTimerFragmentContainer = createFragmentContainer(LotTimer, {
  saleArtwork: graphql`
    fragment LotTimer_saleArtwork on SaleArtwork {
      endAt
      formattedStartDateTime
      extendedBiddingEndAt
      lotID
      sale {
        startAt
        extendedBiddingPeriodMinutes
        extendedBiddingIntervalMinutes
        internalID
      }
    }
  `,
})
