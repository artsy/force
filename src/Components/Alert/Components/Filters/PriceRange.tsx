import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"

export const Price: React.FC = () => {
  const { state, dispatch } = useAlertContext()

  const handlePriceRangeUpdate = (updatedValues: CustomRange) => {
    dispatch({
      type: "SET_CRITERIA_ATTRIBUTE",
      payload: { key: "priceRange", value: updatedValues.join("-") },
    })
  }
  return (
    <PriceRange
      priceRange={state.criteria["priceRange"] || DEFAULT_PRICE_RANGE}
      onDebouncedUpdate={handlePriceRangeUpdate}
    />
  )
}
