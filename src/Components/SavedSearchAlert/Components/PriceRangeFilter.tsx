import { Expandable } from "@artsy/palette"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import { FC } from "react"

interface PriceFilterProps {
  priceRange?: string
  onChange: (range: string) => void
}

export const PriceRangeFilter: FC<PriceFilterProps> = ({
  onChange,
  priceRange = DEFAULT_PRICE_RANGE,
}) => {
  const handlePriceRangeUpdate = (updatedRange: CustomRange) => {
    onChange(updatedRange.join("-"))
  }

  return (
    <Expandable
      label="Set price range you are interested in"
      expanded
      borderColor="white100"
    >
      <PriceRange
        priceRange={priceRange}
        onPriceRangeUpdate={handlePriceRangeUpdate}
      />
    </Expandable>
  )
}
