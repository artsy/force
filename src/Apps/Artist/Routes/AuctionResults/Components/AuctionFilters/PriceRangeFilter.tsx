import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import type { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { aggregationsToHistogram } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import {
  type CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import { PriceRange } from "Components/PriceRange/PriceRange"
import { Checkbox, Spacer } from "@artsy/palette"
import type { FC } from "react"

interface PriceRangeFilterProps {
  isExpandable?: boolean
}

export const PriceRangeFilter: FC<
  React.PropsWithChildren<PriceRangeFilterProps>
> = ({ isExpandable = true }) => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const { priceRange, includeEstimateRange, includeUnknownPrices } =
    useCurrentlySelectedFiltersForAuctionResults()
  const bars = aggregationsToHistogram(aggregations as Aggregations)

  const handlePriceRangeUpdate = (updatedRange: CustomRange) => {
    setFilter("priceRange", updatedRange.join("-"))
  }

  return (
    <FilterExpandable label="Price" expanded enabled={isExpandable}>
      <Spacer y={2} />

      <PriceRange
        bars={bars}
        priceRange={priceRange || DEFAULT_PRICE_RANGE}
        onDebouncedUpdate={handlePriceRangeUpdate}
      />

      <Spacer y={2} />

      <Checkbox
        selected={includeEstimateRange}
        onSelect={includeEstimateRange => {
          setFilter("includeEstimateRange", includeEstimateRange)
        }}
      >
        Include estimate range
      </Checkbox>

      <Spacer y={1} />

      <Checkbox
        selected={includeUnknownPrices}
        onSelect={includeUnknownPrices => {
          setFilter("includeUnknownPrices", includeUnknownPrices)
        }}
      >
        Include unknown and unavailable prices
      </Checkbox>
    </FilterExpandable>
  )
}
