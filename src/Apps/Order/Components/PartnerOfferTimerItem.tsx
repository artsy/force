import * as React from "react"
import { useCountdownTimer } from "Apps/Conversations/hooks/useCountdownTimer"
import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { DateTime } from "luxon"
import { Box, ProgressBar, Spacer, Text } from "@artsy/palette"

export const PartnerOfferTimerItem: React.FC<{
  startAt: string
  endAt: string
}> = ({ startAt, endAt }) => {
  const { remainingTime, percentComplete } = useCountdownTimer({
    startTime: startAt,
    endTime: endAt,
  })
  const actionDeadline = DateTime.fromISO(endAt, {
    zone: "America/New_York",
  }).toFormat("MMM d, h:mm a ZZZZ")

  return (
    <>
      <Box flexDirection="row" textAlign="center">
        <>
          <Text variant="sm" color="blue100" mt={2}>
            <StopwatchIcon
              display="inline-block"
              top="0.2rem"
              width={14}
              height={17}
              fill="blue100"
            />
            {remainingTime} left
          </Text>
          <ProgressBar percentComplete={percentComplete} highlight="blue100" />
          <Text variant="sm" fontWeight="bold">
            Purchase by {actionDeadline}
          </Text>
          <Text variant="xs" color="black60">
            Offer Expires after 72 hours.
          </Text>
          <Text variant="xs" color="black60">
            Keep in mind the work can be sold to another buyer in the meantime.
          </Text>
        </>
      </Box>
      <Spacer y={2} />
    </>
  )
}
