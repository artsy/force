import { FC, useMemo } from "react"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { sortBy } from "lodash"
import { PriceRange } from "Components/PriceRange/PriceRange"
import { CustomRange } from "Components/PriceRange/constants"
import { parsePriceRange } from "Components/PriceRange/Utils/parsePriceRange"
import { HistogramBarEntity } from "Components/PriceRange/Histogram"

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
        onDebouncedUpdate={onPriceRangeUpdate}
      />
    </FilterExpandable>
  )
}

export const aggregationsToHistogram = (
  aggregations?: Aggregations | null
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

  const { priceRange } = useCurrentlySelectedFilters()

  const range = parsePriceRange(priceRange)

  const histogram = useMemo(
    () => aggregationsToHistogram(filters.aggregations),
    [filters.aggregations]
  )

  const onPriceRangeUpdate = (nextRange: CustomRange) => {
    filters.setFilter("priceRange", nextRange.join("-"))
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
