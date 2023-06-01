import { FC, useEffect, useState, useMemo } from "react"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { debounce, sortBy } from "lodash"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  DEFAULT_CUSTOM_RANGE,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import { parseRange } from "Components/PriceRange/utils/parseRange"
import { HistogramBarEntity } from "Components/PriceRange/Histogram"

export type CustomRange = (number | "*")[]

const DEBOUNCE_DELAY = 300

export interface PriceRangeFilterProps {
  expanded?: boolean
}

export const PriceRangeFilter: FC<PriceRangeFilterProps> = ({ expanded }) => {
  const {
    shouldStageFilterChanges,
    aggregations,
    setFilter,
  } = useArtworkFilterContext()
  const { priceRange, reset } = useCurrentlySelectedFilters()
  const [range, setRange] = useState(parseRange(priceRange))
  const bars = getBarsFromAggregations(aggregations)

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.priceRange
  )
  const label = `Price${filtersCount}`
  const hasSelection = priceRange && isCustomValue(priceRange)

  const setFilterDobounced = useMemo(
    () => debounce(setFilter, DEBOUNCE_DELAY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shouldStageFilterChanges]
  )

  useEffect(() => {
    // if price filter or filters state is being reset, then also clear local input state
    if (reset || priceRange === DEFAULT_PRICE_RANGE) {
      setRange(DEFAULT_CUSTOM_RANGE)
    }
  }, [reset, priceRange])

  const handlePriceRangeUpdate = (updatedRange: CustomRange) => {
    setRange(updatedRange)
    setFilterDobounced("priceRange", updatedRange.join("-"))
  }

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
      <PriceRange
        priceRange={range.join("-")}
        bars={bars}
        onPriceRangeUpdate={handlePriceRangeUpdate}
      />
    </FilterExpandable>
  )
}

export const getBarsFromAggregations = (aggregations?: Aggregations) => {
  const aggregation = aggregations?.find(aggregation => {
    return aggregation.slice === "SIMPLE_PRICE_HISTOGRAM"
  })
  const counts = aggregation?.counts ?? []
  const bars: HistogramBarEntity[] = counts.map(entity => ({
    count: entity.count,
    value: Number(entity.value),
  }))
  const sortedBars = sortBy(bars, "value")

  return sortedBars
}
