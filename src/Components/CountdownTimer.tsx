import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Spacer, StackableBorderBox, Text } from "@artsy/palette"
import { ProgressBarTimer } from "Components/ProgressBarTimer"
import { TimeRemaining } from "Components/TimeRemaining"
import { DateTime } from "luxon"
import React from "react"
import { useCurrentTime } from "Utils/Hooks/useCurrentTime"

const FIVE_HOURS_IN_SECONDS = 60 * 60 * 5

export interface CountdownTimerProps {
  action: string
  note: string
  countdownStart: string
  countdownEnd: string
}

/**
 * Extracted out of @artsy/palette
 * @deprecated Use `useTimer` instead
 */
export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  action,
  note,
  countdownEnd,
  countdownStart,
}) => {
  const currentTime = useCurrentTime({ syncWithServer: true })
  const endDateTime = DateTime.fromISO(countdownEnd).toLocal()

  const minutes =
    endDateTime.minute < 10 ? "0" + endDateTime.minute : endDateTime.minute

  const amPm = endDateTime.hour >= 12 ? "pm" : "am"

  let hour: number

  if (endDateTime.hour > 12) {
    hour = endDateTime.hour - 12
  } else if (endDateTime.hour === 0) {
    hour = 12
  } else {
    hour = endDateTime.hour
  }

  const time = `${hour}:${minutes}${amPm}`

  const actionDeadline = `${endDateTime.monthShort} ${endDateTime.day}, ${time} ${endDateTime.offsetNameShort}`

  const highlight =
    endDateTime.diff(DateTime.fromISO(currentTime.toString()), "seconds")
      .seconds < FIVE_HOURS_IN_SECONDS
      ? "red100"
      : "brand"

  return (
    <StackableBorderBox flexDirection="column">
      <Flex justifyContent="flex-start" alignItems="center">
        <StopwatchIcon width={14} height={17} fill={highlight} />

        <Spacer x={0.5} />

        <TimeRemaining
          countdownEnd={countdownEnd}
          highlight={highlight}
          currentTime={currentTime}
          timeEndedDisplayText="0 days left"
          trailingText="left"
        />
      </Flex>

      <ProgressBarTimer
        countdownStart={countdownStart}
        countdownEnd={countdownEnd}
        currentTime={currentTime}
        highlight={highlight}
      />

      <Text variant="xs" fontWeight="bold">
        {action} by {actionDeadline}
      </Text>

      <Text variant="xs" color="black60">
        {note}
      </Text>
    </StackableBorderBox>
  )
}
