import type { Time } from "Utils/getSaleOrLotTimerInfo"
import { type BoxProps, ProgressBar } from "@artsy/palette"
import type * as React from "react"

export interface ArtworkSidebarAuctionProgressBarProps extends BoxProps {
  time: Time
  extendedBiddingPeriodMinutes: number
  hasBeenExtended: boolean
  extendedBiddingIntervalMinutes: number
}

export const ArtworkSidebarAuctionProgressBar: React.FC<
  React.PropsWithChildren<ArtworkSidebarAuctionProgressBarProps>
> = ({
  time,
  extendedBiddingPeriodMinutes,
  hasBeenExtended,
  extendedBiddingIntervalMinutes,
  ...rest
}) => {
  const { days, hours, minutes, seconds } = time

  const parsedDaysUntilEnd = Number.parseInt(days, 10)
  const parsedHoursUntilEnd = Number.parseInt(hours, 10)
  const parsedMinutesUntilEnd = Number.parseInt(minutes, 10)
  const parsedSecondsUntilEnd = Number.parseInt(seconds, 10)

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
