import { LotTimer_saleArtwork } from "v2/__generated__/LotTimer_saleArtwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import * as React from "react"
import { Flex, Text, Spacer } from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"

export interface LotTimerProps {
  saleArtwork: LotTimer_saleArtwork
}

export const LotTimer: React.FC<LotTimerProps> = ({ saleArtwork }) => {
  const { endAt } = saleArtwork

  const startAt = saleArtwork?.sale?.startAt
  const extendedBiddingPeriodMinutes =
    saleArtwork?.sale?.extendedBiddingPeriodMinutes

  const { hasEnded, time, hasStarted } = useTimer(endAt!, startAt!)

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
      {extendedBiddingPeriodMinutes && (
        <>
          <Spacer mt={1} />
          <Text variant="xs" color={"black60"}>
            *Closure times may be extended to accomodate last minute bids
          </Text>
        </>
      )}
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
        extendedBiddingPeriodMinutes
      }
    }
  `,
})

export const getTimerCopy = (time, hasStarted) => {
  const { days, hours, minutes, seconds } = time

  const parsedDays = parseInt(days, 10)
  const parsedHours = parseInt(hours, 10)
  const parsedMinutes = parseInt(minutes, 10)
  const parsedSeconds = parseInt(seconds, 10)

  let copy = ""
  let color = "blue100"

  // Sale has not yet started
  if (!hasStarted) {
    copy = `${parsedDays + 1} Day${
      parsedDays >= 1 ? "s" : ""
    } Until Bidding Starts`
  } else {
    // 2mins or fewer until close
    if (
      parsedDays < 1 &&
      parsedHours < 1 &&
      ((parsedMinutes === 2 && parsedSeconds === 0) || parsedMinutes <= 1)
    ) {
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
    else if (parsedDays < 1 && parsedHours < 1 && parsedMinutes >= 2) {
      copy = `${parsedMinutes}m ${parsedSeconds}s`
    }
  }

  return { copy, color }
}
