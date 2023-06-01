import { Expandable, Spacer } from "@artsy/palette"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { FC } from "react"

export const PriceRangeFilter: FC = () => {
  const { criteria, setCriteriaValue } = useSavedSearchAlertContext()

  const handlePriceRangeUpdate = (updatedRange: CustomRange) => {
    setCriteriaValue("priceRange", updatedRange.join("-"))
  }

  return (
    <Expandable
      label="Set price range you are interested in"
      expanded
      borderColor="white100"
    >
      <Spacer y={2} />

      <PriceRange
        priceRange={criteria.priceRange ?? DEFAULT_PRICE_RANGE}
        onPriceRangeUpdate={handlePriceRangeUpdate}
      />
    </Expandable>
  )
}
