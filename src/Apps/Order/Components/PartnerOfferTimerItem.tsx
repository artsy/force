import * as React from "react"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { DateTime } from "luxon"
import { Box, ProgressBar, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { PartnerOfferTimerItem_order$key } from "__generated__/PartnerOfferTimerItem_order.graphql"

export const PartnerOfferTimerItem: React.FC<{
  order: PartnerOfferTimerItem_order$key
}> = ({ order }) => {
  const data = useFragment(query, order)

  const endTime = data.stateExpiresAt || ""
  const startTime = endTime
    ? DateTime.fromISO(endTime).minus({ days: 3 }).toString()
    : ""

  const { remainingTime, percentComplete, isImminent } = useCountdownTimer({
    startTime: startTime,
    endTime: endTime,
    imminentTime: 1,
  })

  const remainingTimeColor = isImminent ? "orange100" : "blue100"

  if (remainingTime.match(/^NaN/)) {
    return null
  }

  if (data.displayState !== "PENDING") {
    return null
  }

  const actionDeadline = DateTime.fromISO(endTime, {
    zone: "America/New_York",
  }).toFormat("MMM d, h:mm a ZZZZ")

  return (
    <Box flexDirection="row" textAlign="center">
      <Text variant="sm" color={remainingTimeColor} mt={2}>
        <StopwatchIcon
          display="inline-block"
          top="0.2rem"
          width={14}
          height={17}
          fill={remainingTimeColor}
        />
        {remainingTime === "Expired" ? remainingTime : `${remainingTime} left`}
      </Text>
      <ProgressBar percentComplete={percentComplete} highlight="blue100" />
      <Text variant="sm" fontWeight="bold">
        Purchase by {actionDeadline}
      </Text>
      <Text variant="xs" color="black60">
        Offers expire after 72 hours.
      </Text>
      <Text variant="xs" color="black60">
        Keep in mind the work can be sold to another buyer in the meantime.
      </Text>
    </Box>
  )
}

const query = graphql`
  fragment PartnerOfferTimerItem_order on CommerceOrder {
    displayState
    stateExpiresAt
  }
`
