import { Checkbox, Expandable, Spacer } from "@artsy/palette"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import { FC, useMemo } from "react"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { debounce } from "lodash"
import { getBarsFromAggregations } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"

const DEBOUNCE_DELAY = 300

export const PriceRangeFilter: FC = () => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const {
    priceRange,
    includeEstimateRange,
    includeUnknownPrices,
  } = useCurrentlySelectedFiltersForAuctionResults()
  const bars = getBarsFromAggregations(aggregations)

  const setFilterDobounced = useMemo(
    () => setFilter && debounce(setFilter, DEBOUNCE_DELAY),
    [setFilter]
  )

  const handlePriceRangeUpdate = (updatedRange: CustomRange) => {
    setFilterDobounced?.("priceRange", updatedRange.join("-"))
  }

  return (
    <Expandable label="Price" expanded>
      <Spacer y={2} />
      <PriceRange
        bars={bars}
        priceRange={priceRange || DEFAULT_PRICE_RANGE}
        onPriceRangeUpdate={handlePriceRangeUpdate}
      />
      <Spacer y={2} />
      <Checkbox
        selected={includeEstimateRange}
        onSelect={includeEstimateRange => {
          setFilter?.("includeEstimateRange", includeEstimateRange)
        }}
      >
        Include estimate range
      </Checkbox>
      <Spacer y={1} />
      <Checkbox
        selected={includeUnknownPrices}
        onSelect={includeUnknownPrices => {
          setFilter?.("includeUnknownPrices", includeUnknownPrices)
        }}
      >
        Include unknown and unavailable prices
      </Checkbox>
    </Expandable>
  )
}
