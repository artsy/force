import { LotTimer_saleArtwork } from "v2/__generated__/LotTimer_saleArtwork.graphql"
import { LotTimerQuery } from "v2/__generated__/LotTimerQuery.graphql"
import { SystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
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

  return (
    <Flex alignItems="center" flexDirection="column">
      <Text variant="md" color={"blue100"}>
        {!hasEnded && <Text color={timerCopy.color}>{timerCopy.copy}</Text>}
      </Text>

      <Text variant="md" color={"black60"}>
        {saleArtwork.formattedStartDateTime}
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
  const { days, hours, minutes, seconds } = time

  const parsedDays = parseInt(days, 10)
  const parsedHours = parseInt(hours, 10)
  const parsedMinutes = parseInt(minutes, 10)
  const parsedSeconds = parseInt(seconds, 10)

  let copy = ""
  let color = "blue100"

  if (!hasStarted) {
    copy = `${parsedDays + 1} Day${
      parsedDays >= 1 ? "s" : ""
    } Until Bidding Starts`
  } else {
    if (parsedDays < 1 && parsedHours < 1 && parsedMinutes <= 2) {
      copy = `${parsedMinutes}m ${parsedSeconds}s`
      color = "red100"
    }

    // More than 24 hours until close
    else if (parsedDays >= 1) {
      copy = `${parsedDays}d ${parsedHours}h`
    }

    // 1-24 hours until close
    else if (parsedDays < 1 && parsedHours >= 1) {
      copy = `${parsedHours}h ${parsedMinutes}m`
    }

    // 2-60 mins until close
    else if (parsedDays < 1 && parsedHours < 1 && parsedMinutes > 2) {
      copy = `${parsedMinutes}m ${parsedSeconds}s`
    }
  }

  return { copy, color }
}
