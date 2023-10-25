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
  CustomRange,
  DEFAULT_CUSTOM_RANGE,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import { parsePriceRange } from "Components/PriceRange/Utils/parsePriceRange"
import { HistogramBarEntity } from "Components/PriceRange/Histogram"

const DEBOUNCE_DELAY = 300

export interface PriceRangeFilterProps {
  expanded?: boolean
}

export const PriceRangeFilter: FC<PriceRangeFilterProps> = ({ expanded }) => {
  const { field, range, histogram, onPriceRangeUpdate } = usePriceRangeFilter()

  const countLabel = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.priceRange
  )

  const label = `Price${countLabel}`
  const hasSelection = field && isCustomValue(field)

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
      <PriceRange
        priceRange={range.join("-")}
        bars={histogram}
        onPriceRangeUpdate={onPriceRangeUpdate}
      />
    </FilterExpandable>
  )
}

export const aggregationsToHistogram = (
  aggregations?: Aggregations
): HistogramBarEntity[] => {
  if (!aggregations) return []

  const aggregation = aggregations.find(({ slice }) => {
    return slice === "SIMPLE_PRICE_HISTOGRAM"
  })

  if (!aggregation) return []

  const bars: HistogramBarEntity[] = aggregation.counts.map(
    ({ count, value }) => ({ count, value: Number(value) })
  )

  return sortBy(bars, "value")
}

export const usePriceRangeFilter = () => {
  const filters = useArtworkFilterContext()

  const { priceRange, reset } = useCurrentlySelectedFilters()

  const [range, setRange] = useState(parsePriceRange(priceRange))

  const histogram = useMemo(
    () => aggregationsToHistogram(filters.aggregations),
    [filters.aggregations]
  )

  const debouncedSetFilter = useMemo(
    () => debounce(filters.setFilter, DEBOUNCE_DELAY),
    // TODO: Explain why this is disabled
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.shouldStageFilterChanges]
  )

  useEffect(() => {
    // if price filter or filters state is being reset, then also clear local input state
    if (reset || priceRange === DEFAULT_PRICE_RANGE) {
      setRange(DEFAULT_CUSTOM_RANGE)
    }
  }, [reset, priceRange])

  const onPriceRangeUpdate = (nextRange: CustomRange) => {
    setRange(nextRange)
    debouncedSetFilter("priceRange", nextRange.join("-"))
  }

  const count = filters.selectedFiltersCounts.priceRange || 0

  return {
    filters,
    field: priceRange,
    count,
    range,
    reset: () => filters.setFilter("priceRange", []),
    histogram,
    onPriceRangeUpdate,
  }
}
