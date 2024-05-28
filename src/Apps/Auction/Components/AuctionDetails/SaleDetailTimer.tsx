import { SaleDetailTimer_sale$data } from "__generated__/SaleDetailTimer_sale.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import * as React from "react"
import { Text } from "@artsy/palette"
import { useTimer } from "Utils/Hooks/useTimer"
import { getSaleOrLotTimerInfo } from "Utils/getSaleOrLotTimerInfo"

export interface SaleDetailTimerProps {
  sale: SaleDetailTimer_sale$data
}

export const SaleDetailTimer: React.FC<SaleDetailTimerProps> = ({ sale }) => {
  const endAt = sale?.endAt
  const startAt = sale?.startAt
  const endedAt = sale?.endedAt

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { hasEnded, time, hasStarted } = useTimer(endAt!, startAt!)

  if (!endAt || endedAt) {
    return null
  }

  const timerCopy = getSaleOrLotTimerInfo(time, {
    hasStarted,
    lotsAreClosing: hasEnded,
    isSaleInfo: true,
  })

  return (
    <Text variant="sm-display" color={timerCopy.color || "blue100"}>
      {timerCopy.copy}
    </Text>
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
