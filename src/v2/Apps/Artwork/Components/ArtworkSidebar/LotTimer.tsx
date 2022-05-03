import { LotTimer_saleArtwork } from "v2/__generated__/LotTimer_saleArtwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import * as React from "react"
import { Text, Spacer, Box } from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import { getSaleOrLotTimerInfo } from "v2/Utils/getSaleOrLotTimerInfo"
import { ArtworkSidebarAuctionProgressBar } from "./ArtworkSidebarAuctionProgressBar"
import { useEffect } from "react"
import { getENV } from "v2/Utils/getENV"

export interface LotTimerProps {
  saleArtwork: LotTimer_saleArtwork
}

export const LotTimer: React.FC<LotTimerProps> = ({ saleArtwork }) => {
  const { endAt, extendedBiddingEndAt, lotID } = saleArtwork

  const startAt = saleArtwork.sale?.startAt
  const extendedBiddingPeriodMinutes =
    saleArtwork.sale?.extendedBiddingPeriodMinutes
  const extendedBiddingIntervalMinutes =
    saleArtwork.sale?.extendedBiddingIntervalMinutes

  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = React.useState(
    biddingEndAt
  )
  const [isExtended, setIsExtended] = React.useState(false)

  useEffect(() => {
    if (extendedBiddingIntervalMinutes) {
      const actionCable = require("actioncable")
      const CableApp = {} as any
      CableApp.cable = actionCable.createConsumer(
        getENV("GRAVITY_WEBSOCKET_URL")
      )

      CableApp.cable.subscriptions.create(
        {
          channel: "SalesChannel",
          sale_id: saleArtwork.sale?.internalID,
        },
        {
          received(data) {
            if (data.lot_id === lotID) {
              setUpdatedBiddingEndAt(data.extended_bidding_end_at)
              setIsExtended(true)
            }
          },
        }
      )
    }
  }, [])

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
      <Text variant="md" color={"blue100"}>
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

      <Text variant="md" color={"black60"}>
        {saleArtwork.formattedStartDateTime}
      </Text>

      {extendedBiddingPeriodMinutes && (
        <>
          <Spacer mt={1} />
          <Text variant="xs" color={"black60"}>
            *Closure times may be extended to accomodate last minute bids
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
