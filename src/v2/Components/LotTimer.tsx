import { LotTimer_saleArtwork } from "v2/__generated__/LotTimer_saleArtwork.graphql"
import { LotTimerQuery } from "v2/__generated__/LotTimerQuery.graphql"
import { SystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { DateTime } from "luxon"
import { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import * as React from "react"
import { Flex, Text } from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import { get } from "v2/Utils/get"

export interface LotTimerProps {
  saleArtwork: LotTimer_saleArtwork
}

export const LotTimer: React.FC<LotTimerProps> = ({ saleArtwork }) => {
  const { endAt } = saleArtwork

  const startAt = get(saleArtwork, sa => sa.sale?.startAt)

  const { hasEnded, time, hasStarted } = useTimer(endAt || "", startAt || "")

  if (!endAt) {
    return null
  }

  const timerCopy = getTimerCopy(time, hasStarted)

  const labelCopy = getTimerLabelCopy(endAt, startAt, hasStarted, hasEnded)

  return (
    <Flex alignItems="center" flexDirection="column">
      <Text variant="md" color={"blue100"}>
        {!hasEnded && <Text color={timerCopy.color}>{timerCopy.copy}</Text>}
      </Text>

      <Text variant="md" color={"black60"}>
        {labelCopy}
      </Text>
    </Flex>
  )
}

export const LotTimerFragmentContainer = createFragmentContainer(LotTimer, {
  saleArtwork: graphql`
    fragment LotTimer_saleArtwork on SaleArtwork {
      endAt
      formattedStartDateTime
      sale {
        startAt
      }
    }
  `,
})

export const LotTimerQueryRenderer = ({
  saleArtworkID,
}: {
  saleArtworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <SystemQueryRenderer<LotTimerQuery>
      environment={relayEnvironment}
      variables={{ saleArtworkID }}
      query={graphql`
        query LotTimerQuery($saleArtworkID: String!) {
          saleArtwork(id: $saleArtworkID) {
            ...LotTimer_saleArtwork
          }
        }
      `}
      render={({ props }) => {
        return (
          props && (
            <LotTimerFragmentContainer saleArtwork={props.saleArtwork!} />
          )
        )
      }}
    />
  )
}

export const getTimerCopy = (time, hasStarted) => {
  console.log("time", time)
  const { days, hours, minutes, seconds } = time

  const pDays = parseInt(days, 10)
  const pHours = parseInt(hours, 10)
  const pMinutes = parseInt(minutes, 10)
  const pSeconds = parseInt(seconds, 10)

  let copy = ""
  let color = "blue100"

  if (!hasStarted) {
    copy = `${pDays + 1} Day${pDays >= 1 ? "s" : ""} Until Bidding Starts`
  } else {
    if (pDays < 1 && pHours < 1 && pMinutes <= 2) {
      copy = `${pMinutes}m ${pSeconds}s`
      color = "red100"
    }

    // More than 24 hours until close
    else if (pDays >= 1) {
      copy = `${pDays}d ${pHours}h`
    }

    // 1-24 hours until close
    else if (pDays < 1 && pHours >= 1) {
      copy = `${pHours}h ${pMinutes}m`
    }

    // 2-60 mins until close
    else if (pDays < 1 && pHours < 1 && pMinutes > 2) {
      copy = `${pMinutes}m ${pSeconds}s`
    }
  }

  return { copy, color }
}

export const getTimerLabelCopy = (endDate, startAt, hasStarted, hasEnded) => {
  const startAtDisplay = getDateTimeDisplay(startAt)
  if (!hasStarted) {
    return startAtDisplay
  }

  if (hasEnded) {
    return "Closed"
  }

  const endAtDisplay = getDateTimeDisplay(endDate)
  return `Closes ${endAtDisplay}`
}

// This should go in metaphysics (formattedStartEndTime)
const getDateTimeDisplay = (date): string => {
  const dateTime = DateTime.fromISO(date)
  const amPm = dateTime.hour >= 12 ? "pm" : "am"
  const minutes = dateTime.minute < 10 ? "0" + dateTime.minute : dateTime.minute
  let hour
  if (dateTime.hour > 12) {
    hour = dateTime.hour - 12
  } else if (dateTime.hour === 0) {
    hour = 12
  } else {
    hour = dateTime.hour
  }
  // How do we get timezone here?
  return `${dateTime.monthShort} ${dateTime.day}, ${hour}:${minutes}${amPm}`
}
