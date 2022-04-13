import { SaleDetailTimer_sale } from "v2/__generated__/SaleDetailTimer_sale.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import * as React from "react"
import { Flex, Text } from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"

export interface SaleDetailTimerProps {
  sale: SaleDetailTimer_sale
}

export const SaleDetailTimer: React.FC<SaleDetailTimerProps> = ({ sale }) => {
  const endAt = sale?.endAt
  const startAt = sale?.startAt
  const endedAt = sale?.endedAt
  const { hasEnded, time, hasStarted } = useTimer(endAt!, startAt!)

  if (!endAt) {
    return null
  }

  const timerCopy = getTimerCopy(time, hasStarted, hasEnded)

  return (
    <Flex alignItems="center" flexDirection="column">
      <Text variant="lg" color={"blue100"}>
        {!endedAt && <Text color={timerCopy.color}>{timerCopy.copy}</Text>}
      </Text>
    </Flex>
  )
}

export const SaleDetailTimerFragmentContainer = createFragmentContainer(
  SaleDetailTimer,
  {
    sale: graphql`
      fragment SaleDetailTimer_sale on Sale {
        endAt
        endedAt
        startAt
      }
    `,
  }
)

export const getTimerCopy = (time, hasStarted, lotsAreClosing) => {
  const { days, hours, minutes, seconds } = time

  const parsedDays = parseInt(days, 10)
  const parsedHours = parseInt(hours, 10)
  const parsedMinutes = parseInt(minutes, 10)
  const parsedSeconds = parseInt(seconds, 10)

  let copy = ""
  let color = "blue100"

  // Sale has not yet started
  if (!hasStarted) {
    copy = relativeDaysUntil(parsedDays, "Bidding Starts")
  }
  // Lots are closing
  else if (lotsAreClosing) {
    copy = "Lots are closing"
    color = "red100"
  }
  // Lots haven't yet closed
  else {
    // 1 hour or less
    if (parsedDays < 1 && parsedHours < 1) {
      copy = `${parsedMinutes}m ${parsedSeconds}s`
      color = "red100"
    }
    // More than 24 hours
    else if (parsedDays >= 1) {
      copy = `${parsedDays + 1} Day${parsedDays >= 1 ? "s" : ""}`
    }

    // 1-24 hours until close
    else if (parsedDays < 1 && parsedHours >= 1) {
      copy = `${parsedHours}h ${parsedMinutes}m`
      color = "red100"
    }

    copy += " Until Lots Start Closing"
  }

  return { copy, color }
}

function relativeDaysUntil(parsedDays, suffix) {
  if (parsedDays === 0) {
    return `${suffix} Today`
  } else if (parsedDays === 1) {
    return `${parsedDays} Day Until ${suffix}`
  } else {
    return `${parsedDays} Days Until ${suffix}`
  }
}
