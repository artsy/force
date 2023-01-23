import { Flex, Text } from "@artsy/palette"
import { DateTime, Duration } from "luxon"
import React from "react"

/**
 * Extracted out of @artsy/palette
 * @deprecated Use `useTimer` instead
 */
export const TimeRemaining: React.FC<{
  countdownEnd: string
  currentTime: string
  highlight: string
  labelWithoutTimeRemaining?: string
  labelWithTimeRemaining?: string
  timeEndedDisplayText?: string
  trailingText?: string
}> = ({
  countdownEnd,
  currentTime,
  highlight = "brand",
  labelWithoutTimeRemaining,
  labelWithTimeRemaining,
  timeEndedDisplayText,
  trailingText,
}) => {
  const duration = Duration.fromISO(
    DateTime.fromISO(countdownEnd)
      .diff(DateTime.fromISO(currentTime))
      .toString()
  )

  const hasEnded = Math.floor(duration.seconds) <= 0

  const days = `${padWithZero(Math.max(0, Math.floor(duration.as("days"))))}d `

  const hours = `${padWithZero(
    Math.max(0, Math.floor(duration.as("hours") % 24))
  )}h `

  const minutes = `${padWithZero(
    Math.max(0, Math.floor(duration.as("minutes") % 60))
  )}m `

  const seconds = `${padWithZero(
    Math.max(0, Math.floor(duration.as("seconds") % 60))
  )}s`

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text variant="sm" color={highlight} fontWeight="bold">
        {hasEnded && timeEndedDisplayText ? (
          timeEndedDisplayText
        ) : (
          <>
            {days}
            {hours}
            {minutes}
            {seconds}
            {trailingText && ` ${trailingText}`}
          </>
        )}
      </Text>

      {(labelWithTimeRemaining || labelWithoutTimeRemaining) && (
        <Text variant="sm" fontWeight="bold">
          {hasEnded ? labelWithoutTimeRemaining : labelWithTimeRemaining}
        </Text>
      )}
    </Flex>
  )
}

const padWithZero = (num: number) => {
  return num.toString().padStart(2, "0")
}
