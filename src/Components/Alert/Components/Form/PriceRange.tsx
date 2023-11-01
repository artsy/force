import { Expandable, Spacer } from "@artsy/palette"
import { FC } from "react"

import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"

interface PricaRangeFilterProps {
  expanded?: boolean
}

export const PriceRangeFilter: FC<PricaRangeFilterProps> = ({
  expanded = true,
}) => {
  const { state, dispatch } = useAlertContext()

  const handlePriceRangeUpdate = (updatedRange: CustomRange) => {
    dispatch({
      type: "SET_CRITERIA_ATTRIBUTE",
      payload: { key: "priceRange", value: updatedRange.join("-") },
    })
  }

  return (
    <Expandable
      label="Set price range you are interested in"
      expanded={expanded}
      borderColor="white100"
    >
      <Spacer y={2} />

      <PriceRange
        priceRange={state.criteria.priceRange ?? DEFAULT_PRICE_RANGE}
        onPriceRangeUpdate={handlePriceRangeUpdate}
      />
    </Expandable>
  )
}
