import { ProgressBar } from "@artsy/palette"
import type { Color } from "@artsy/palette-tokens"
import { DateTime } from "luxon"
import type React from "react"

interface ProgressBarTimerProps {
  currentTime: string | DateTime
  countdownStart: string
  countdownEnd: string
  highlight: Color
}

/**
 * Extracted out of @artsy/palette
 * @deprecated Add a `progress` field to the return of `useTimer` instead
 */
export const ProgressBarTimer: React.FC<
  React.PropsWithChildren<ProgressBarTimerProps>
> = ({ currentTime, countdownStart, countdownEnd, highlight = "brand" }) => {
  const secondsRemaining = DateTime.fromISO(countdownEnd).diff(
    DateTime.fromISO(currentTime.toString()),
    "seconds",
  ).seconds

  const totalSeconds = DateTime.fromISO(countdownEnd).diff(
    DateTime.fromISO(countdownStart),
    "seconds",
  ).seconds

  const progress = Math.max(0, (secondsRemaining * 100) / totalSeconds)

  return <ProgressBar percentComplete={progress} highlight={highlight} />
}
