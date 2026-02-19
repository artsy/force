import type { Aggregations } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import type { AuctionResultsFilters } from "Apps/Artist/Routes/AuctionResults/initialAuctionResultsFilterState"
import { isCustomValue } from "Components/ArtworkFilter/ArtworkFilters/Utils/isCustomValue"
import { priceRangeToLabel } from "Components/PriceRange/Utils/priceRangeToLabel"
import type { FilterPill } from "Components/SavedSearchAlert/types"
import type { Metric } from "Utils/metrics"
import { compact, isNil } from "es-toolkit"
import {
  BOOLEAN_FILTER_LABELS,
  INVERTED_BOOLEAN_FILTERS,
  getFilterDisplayName,
} from "./filterDisplayNames"

interface PillGeneratorContext {
  metric: Metric
  aggregations: Aggregations
}

interface PillGenerators {
  // Array filters
  organizations: (
    values: string[],
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill[] | null
  categories: (
    values: string[],
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill[] | null
  sizes: (
    values: string[],
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill[] | null

  // Boolean filters
  hideUpcoming: (
    value: boolean,
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill | null
  includeEstimateRange: (
    value: boolean,
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill | null
  includeUnknownPrices: (
    value: boolean,
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill | null
  allowEmptyCreatedDates: (
    value: boolean,
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill | null
  allowUnspecifiedSaleDates: (
    value: boolean,
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill | null

  // String filters
  keyword: (
    value: string,
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill | null
  currency: (
    value: string,
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill | null
  priceRange: (
    value: string,
    field: string,
    context?: PillGeneratorContext,
  ) => FilterPill | null

  // Year filters (no-ops)
  createdAfterYear: () => null
  createdBeforeYear: () => null
  saleStartYear: () => null
  saleEndYear: () => null
}

const createPill = (
  field: string,
  value: string,
  displayValue: string,
): FilterPill => ({
  field,
  value,
  displayValue,
})

const pillGenerators: PillGenerators = {
  // Array-based filters with display name mappings
  organizations: values =>
    values?.length > 0
      ? values.map(value =>
          createPill(
            "organizations",
            value,
            getFilterDisplayName("organizations", value),
          ),
        )
      : null,

  categories: values =>
    values?.length > 0
      ? values.map(value =>
          createPill(
            "categories",
            value,
            getFilterDisplayName("categories", value),
          ),
        )
      : null,

  sizes: (values, _, context) =>
    values?.length > 0 && context
      ? values.map(value =>
          createPill(
            "sizes",
            value,
            getFilterDisplayName("sizes", value, { metric: context.metric }),
          ),
        )
      : null,

  // Boolean filters
  hideUpcoming: value =>
    value === true
      ? createPill("hideUpcoming", "true", BOOLEAN_FILTER_LABELS.hideUpcoming)
      : null,

  includeEstimateRange: value =>
    value === true
      ? createPill(
          "includeEstimateRange",
          "true",
          BOOLEAN_FILTER_LABELS.includeEstimateRange,
        )
      : null,

  includeUnknownPrices: value =>
    value === false
      ? createPill(
          "includeUnknownPrices",
          "false",
          INVERTED_BOOLEAN_FILTERS.includeUnknownPrices,
        )
      : null,

  allowEmptyCreatedDates: value =>
    value === false
      ? createPill(
          "allowEmptyCreatedDates",
          "false",
          INVERTED_BOOLEAN_FILTERS.allowEmptyCreatedDates,
        )
      : null,

  allowUnspecifiedSaleDates: value =>
    value === false
      ? createPill(
          "allowUnspecifiedSaleDates",
          "false",
          INVERTED_BOOLEAN_FILTERS.allowUnspecifiedSaleDates,
        )
      : null,

  // String filters
  keyword: value =>
    value
      ? createPill("keyword", value, getFilterDisplayName("keyword", value))
      : null,

  currency: value =>
    value
      ? createPill("currency", value, getFilterDisplayName("currency", value))
      : null,

  priceRange: value =>
    value && isCustomValue(value)
      ? createPill("priceRange", value, priceRangeToLabel(value))
      : null,

  // Year fields are handled separately in createYearRangePills
  createdAfterYear: () => null,
  createdBeforeYear: () => null,
  saleStartYear: () => null,
  saleEndYear: () => null,
}

const createYearRangePill = (
  startYear: number | null | undefined,
  endYear: number | null | undefined,
  prefix: string,
  fieldPrefix: string,
): FilterPill | null => {
  const hasStart = !isNil(startYear)
  const hasEnd = !isNil(endYear)

  if (!hasStart && !hasEnd) return null

  if (hasStart && hasEnd) {
    const isSameYear = startYear === endYear

    return createPill(
      fieldPrefix,
      isSameYear ? `${startYear}` : `${startYear}-${endYear}`,
      `${prefix}: ${isSameYear ? startYear : `${startYear}–${endYear}`}`,
    )
  }

  if (hasStart) {
    return createPill(
      `${fieldPrefix}StartYear`,
      `${startYear}`,
      `${prefix} after: ${startYear}`,
    )
  }

  return createPill(
    `${fieldPrefix}EndYear`,
    `${endYear}`,
    `${prefix} before: ${endYear}`,
  )
}

// Check if year ranges have changed from initial state
const hasYearRangeChanged = (
  current: { start?: number | null; end?: number | null },
  initial: { start?: number | null; end?: number | null },
): boolean => {
  return current.start !== initial.start || current.end !== initial.end
}

export const extractAuctionResultPillsFromCriteria = ({
  criteria,
  aggregations = [],
  metric = "cm",
  initialState,
}: {
  criteria: AuctionResultsFilters
  aggregations?: Aggregations
  metric?: Metric
  initialState?: AuctionResultsFilters
}): FilterPill[] => {
  const context: PillGeneratorContext = { metric, aggregations }

  // Extract pills using generators
  const standardPills = Object.entries(criteria).flatMap(([field, value]) => {
    const generator = pillGenerators[field]
    if (!generator) return []

    const result = generator(value, field, context)
    return Array.isArray(result) ? result : result ? [result] : []
  })

  // Handle year ranges separately
  const yearRangePills: FilterPill[] = []

  // Created year range
  if (
    !initialState ||
    hasYearRangeChanged(
      { start: criteria.createdAfterYear, end: criteria.createdBeforeYear },
      {
        start: initialState.createdAfterYear,
        end: initialState.createdBeforeYear,
      },
    )
  ) {
    const createdYearPill = createYearRangePill(
      criteria.createdAfterYear,
      criteria.createdBeforeYear,
      "Created",
      "createdYear",
    )
    if (createdYearPill) yearRangePills.push(createdYearPill)
  }

  // Sale year range
  if (
    !initialState ||
    hasYearRangeChanged(
      { start: criteria.saleStartYear, end: criteria.saleEndYear },
      { start: initialState.saleStartYear, end: initialState.saleEndYear },
    )
  ) {
    const saleYearPill = createYearRangePill(
      criteria.saleStartYear,
      criteria.saleEndYear,
      "Sale",
      "saleYear",
    )
    if (saleYearPill) yearRangePills.push(saleYearPill)
  }

  return compact([...standardPills, ...yearRangePills])
}
