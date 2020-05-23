import { Flex, Sans } from "@artsy/palette"
import { WithCurrentTime } from "v2/Components/WithCurrentTime"
import { DateTime, Duration } from "luxon"
import React from "react"

function padWithZero(num: number) {
  return num.toString().padStart(2, "0")
}

const SEPARATOR = <>&nbsp;&nbsp;</>

export const Timer: React.SFC<{
  endDate: string
  labelWithTimeRemaining?: string
  labelWithoutTimeRemaining?: string
}> = ({ endDate, labelWithTimeRemaining, labelWithoutTimeRemaining }) => (
  <WithCurrentTime syncWithServer>
    {currentTime => {
      const duration = Duration.fromISO(
        DateTime.fromISO(endDate)
          .diff(DateTime.fromISO(currentTime))
          .toString()
      )

      const hasEnded = Math.floor(duration.seconds) <= 0

      return (
        <Flex flexDirection="column" alignItems="center">
          <Sans size="4t" weight="medium">
            {padWithZero(Math.max(0, Math.floor(duration.as("days"))))}d
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("hours") % 24)))}h
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("minutes") % 60)))}m
            {SEPARATOR}
            {padWithZero(Math.max(0, Math.floor(duration.as("seconds") % 60)))}s
          </Sans>
          {(labelWithTimeRemaining || labelWithoutTimeRemaining) && (
            <Sans size="3" weight="medium">
              {hasEnded ? labelWithoutTimeRemaining : labelWithTimeRemaining}
            </Sans>
          )}
        </Flex>
      )
    }}
  </WithCurrentTime>
)
