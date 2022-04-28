import { SaleDetailTimer_sale } from "v2/__generated__/SaleDetailTimer_sale.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import * as React from "react"
import { Flex, Text } from "@artsy/palette"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import { getSaleOrLotTimerInfo } from "v2/Utils/getSaleOrLotTimerInfo"

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

  const timerCopy = getSaleOrLotTimerInfo(time, hasStarted, hasEnded, true)

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
