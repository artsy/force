import { SaleDetailTimer_sale } from "v2/__generated__/SaleDetailTimer_sale.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import * as React from "react"
import { Flex, Text } from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import moment from "moment"
export interface SaleDetailTimerProps {
  sale: SaleDetailTimer_sale
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

export const SaleDetailTimer: React.FC<SaleDetailTimerProps> = ({ sale }) => {
  const endAt = sale?.endAt

  const startAt = sale?.startAt

  const endedAt = sale?.endedAt

  const { time } = useTimer(endAt!, startAt!)

  if (!endAt) {
    return null
  }

  const timerCopy = getTimerCopy(time, startAt, endAt, endedAt)

  return (
    <Flex alignItems="center" flexDirection="column">
      <Text variant="lg" color={"blue100"}>
        <Text color={timerCopy.color}>{timerCopy.copy}</Text>
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

export const getTimerCopy = (time, startAt, endAt, endedAt) => {
  const { days, hours, minutes, seconds } = time

  const parsedDays = parseInt(days, 10)
  const parsedHours = parseInt(hours, 10)
  const parsedMinutes = parseInt(minutes, 10)
  const parsedSeconds = parseInt(seconds, 10)
  const thisMoment = moment()
  const lotsClosingMoment = moment(endAt)
  const startedAt = moment(startAt)

  let copy = ""
  let color = "blue100"

  // Sale has ended
  if (!!endedAt) {
    copy = ""
  }
  // Sale has not yet started
  else if (thisMoment.isBefore(startedAt)) {
    copy = relativeDaysUntil(parsedDays, "Bidding Starts")
  }
  // Lots are closing
  else if (thisMoment.isAfter(lotsClosingMoment)) {
    copy = "Lots are closing"
    color = "red100"
  }
  // Lots haven't yet closed
  else {
    // 1 hour or less
    if (parsedDays < 1 && parsedHours < 1 && parsedHours < 1) {
      copy = `${parsedMinutes}m ${parsedSeconds}s Until Bidding Ends`
      color = "red100"
    }

    // More than 24 hours until close
    else if (parsedDays >= 1) {
      copy = `${parsedDays + 1} Day${
        parsedDays >= 1 ? "s" : ""
      } Until Bidding Ends`
    }

    // 1-24 hours until close
    else if (parsedDays < 1 && parsedHours >= 1) {
      copy = `${parsedHours}h ${parsedMinutes}m Until Bidding Ends`
      color = "red100"
    }
  }
  console.log(copy)
  console.log(color)

  return { copy, color }
}
