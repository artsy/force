import { SaleDetailTimer_sale$data } from "__generated__/SaleDetailTimer_sale.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import * as React from "react"
import { Flex, Text } from "@artsy/palette"
import { useTimer } from "Utils/Hooks/useTimer"
import { getSaleOrLotTimerInfo } from "Utils/getSaleOrLotTimerInfo"

export interface SaleDetailTimerProps {
  sale: SaleDetailTimer_sale$data
}

export const SaleDetailTimer: React.FC<SaleDetailTimerProps> = ({ sale }) => {
  const endAt = sale?.endAt
  const startAt = sale?.startAt
  const endedAt = sale?.endedAt
  const { hasEnded, time, hasStarted } = useTimer(endAt!, startAt!)

  if (!endAt) {
    return null
  }

  const timerCopy = getSaleOrLotTimerInfo(time, {
    hasStarted,
    lotsAreClosing: hasEnded,
    isSaleInfo: true,
  })

  return (
    <Flex alignItems="center" flexDirection="column">
      <Text variant="lg-display" color={"blue100"}>
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
