import { useAuctionResultsFilterContext } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import {
  type AuctionResultsFilters,
  initialAuctionResultsFilterState,
} from "Apps/Artist/Routes/AuctionResults/initialAuctionResultsFilterState"
import { allowedAuctionResultFilters } from "Apps/Artist/Utils/allowedAuctionResultFilters"
import type { FilterPill } from "Components/SavedSearchAlert/types"
import { isArray } from "lodash"
import { extractAuctionResultPillsFromCriteria } from "./Utils/extractAuctionResultPills"

// Special field handlers for removal
const YEAR_RANGE_FIELDS = {
  createdYear: ["createdAfterYear", "createdBeforeYear"],
  saleYear: ["saleStartYear", "saleEndYear"],
} as const

export const useAuctionResultsActiveFilters = (
  defaultPills: FilterPill[] = [],
) => {
  const {
    aggregations,
    setFilter,
    filters,
    earliestCreatedYear,
    latestCreatedYear,
  } = useAuctionResultsFilterContext()

  const initialState = initialAuctionResultsFilterState({
    startDate: earliestCreatedYear,
    endDate: latestCreatedYear,
  })

  const criteria = allowedAuctionResultFilters(
    (filters ?? {}) as Record<string, string | boolean>,
  )
  const filterPills = extractAuctionResultPillsFromCriteria({
    criteria: criteria as AuctionResultsFilters,
    aggregations,
    metric: filters?.metric ?? "cm",
    initialState,
  })

  const pills = [...defaultPills, ...filterPills]

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) return

    // Year range fields are handled specially
    const yearRangeFields = YEAR_RANGE_FIELDS[pill.field]

    if (yearRangeFields) {
      yearRangeFields.forEach(field =>
        setFilter(
          field as keyof AuctionResultsFilters,
          initialState[field as keyof AuctionResultsFilters],
        ),
      )
      return
    }

    const currentValue = filters?.[pill.field]
    const newValue = isArray(currentValue)
      ? currentValue.filter(value => value !== pill.value)
      : initialState[pill.field as keyof AuctionResultsFilters]

    setFilter(pill.field as keyof AuctionResultsFilters, newValue)
  }

  return { pills, removePill }
}
