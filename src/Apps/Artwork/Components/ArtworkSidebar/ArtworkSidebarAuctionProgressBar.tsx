import * as React from "react"
import { BoxProps, ProgressBar } from "@artsy/palette"
import { Time } from "Utils/getSaleOrLotTimerInfo"

export interface ArtworkSidebarAuctionProgressBarProps extends BoxProps {
  time: Time
  extendedBiddingPeriodMinutes: number
  hasBeenExtended: boolean
  extendedBiddingIntervalMinutes: number
}

export const ArtworkSidebarAuctionProgressBar: React.FC<ArtworkSidebarAuctionProgressBarProps> = ({
  time,
  extendedBiddingPeriodMinutes,
  hasBeenExtended,
  extendedBiddingIntervalMinutes,
  ...rest
}) => {
  const { days, hours, minutes, seconds } = time

  const parsedDaysUntilEnd = parseInt(days, 10)
  const parsedHoursUntilEnd = parseInt(hours, 10)
  const parsedMinutesUntilEnd = parseInt(minutes, 10)
  const parsedSecondsUntilEnd = parseInt(seconds, 10)

  const isWithinExtendedBiddingPeriod =
    parsedDaysUntilEnd < 1 &&
    parsedHoursUntilEnd < 1 &&
    parsedMinutesUntilEnd < extendedBiddingPeriodMinutes

  const extendedBiddingDuration = hasBeenExtended
    ? extendedBiddingIntervalMinutes
    : extendedBiddingPeriodMinutes

  const percentComplete =
    (parsedSecondsUntilEnd + parsedMinutesUntilEnd * 60) /
    (extendedBiddingDuration * 60)

  const renderProgressBar = isWithinExtendedBiddingPeriod || hasBeenExtended

  return (
    <>
      {renderProgressBar && (
        <ProgressBar
          highlight="red100"
          percentComplete={percentComplete * 100}
          {...rest}
        />
      )}
    </>
  )
}
