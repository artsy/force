import { DEFAULT_METRIC, Metric } from "Utils/metrics"

export interface AuctionResultsFilters {
  organizations?: string[]
  categories?: string[]
  hideUpcoming?: boolean
  sizes?: string[]
  keyword?: string
  page?: number
  sort?: string
  createdAfterYear?: number | null
  createdBeforeYear?: number | null
  allowEmptyCreatedDates?: boolean
  metric?: Metric
  priceRange?: string
  currency?: string
  includeEstimateRange?: boolean
  includeUnknownPrices?: boolean
  saleStartYear?: number | null
  saleEndYear?: number | null
  allowUnspecifiedSaleDates?: boolean
}

const MIN_START_DATE = 0
const MAX_END_DATE = 10000

/**
 * Initial filter state
 */
export const initialAuctionResultsFilterState = ({
  startDate = MIN_START_DATE,
  endDate = MAX_END_DATE,
  metric = DEFAULT_METRIC,
}: {
  startDate?: number | null
  endDate?: number | null
  metric?: Metric
}): AuctionResultsFilters => ({
  organizations: [],
  categories: [],
  hideUpcoming: false,
  sizes: [],
  keyword: undefined,
  page: 1,
  sort: "DATE_DESC",
  createdAfterYear: typeof startDate === "number" ? startDate : MIN_START_DATE,
  createdBeforeYear: typeof endDate === "number" ? endDate : MAX_END_DATE,
  allowEmptyCreatedDates: true,
  metric,
  priceRange: "*-*",
  currency: "",
  includeEstimateRange: false,
  includeUnknownPrices: true,
  saleStartYear: null,
  saleEndYear: null,
  allowUnspecifiedSaleDates: true,
})
