/**
 * Filter parameters that should be included in canonical URLs and meta tags.
 * These represent meaningful filters that create distinct, indexable content.
 */

export const AUCTION_RESULTS_FILTER_PARAMS = [
  "sort",
  "categories",
  "organizations",
  "sizes",
  "keyword",
  "hideUpcoming",
  "createdAfterYear",
  "createdBeforeYear",
  "allowEmptyCreatedDates",
  "priceRange",
  "currency",
  "includeEstimateRange",
  "includeUnknownPrices",
  "saleStartYear",
  "saleEndYear",
  "allowUnspecifiedSaleDates",
] as const

export const ARTWORK_FILTER_PARAMS = [
  "sort",
  "medium",
  "priceRange",
  "sizes",
  "colors",
  "keyword",
  "term",
  "attributionClass",
  "artistIDs",
  "artistSeriesIDs",
  "additionalGeneIDs",
  "majorPeriods",
  "partnerIDs",
  "locationCities",
  "artistNationalities",
  "materialsTerms",
  "acquireable",
  "atAuction",
  "forSale",
  "framed",
  "height",
  "width",
  "inquireableOnly",
  "offerable",
  "signed",
] as const

export const ALL_FILTER_PARAMS = [
  ...AUCTION_RESULTS_FILTER_PARAMS,
  ...ARTWORK_FILTER_PARAMS,
] as const

/**
 * Filters and normalizes URL parameters for canonical URLs.
 * Removes pagination params, sorts alphabetically, and excludes default values.
 */
export function getFilterParams(
  searchParams: URLSearchParams,
  allowedParams: readonly string[] = ALL_FILTER_PARAMS,
): Record<string, string> {
  const filteredParams: Record<string, string> = {}

  // Filter to only allowed params
  for (const [key, value] of searchParams.entries()) {
    if (allowedParams.includes(key as any) && value && value.trim()) {
      filteredParams[key] = value
    }
  }

  // Sort keys alphabetically for consistent URLs
  const sortedParams: Record<string, string> = {}
  Object.keys(filteredParams)
    .sort()
    .forEach(key => {
      sortedParams[key] = filteredParams[key]
    })

  return sortedParams
}

/**
 * Builds a query string from filter parameters
 */
export function buildQueryStringWithFilterParams(
  searchParams: URLSearchParams,
  allowedParams: readonly string[] = ALL_FILTER_PARAMS,
): string {
  const filterParams = getFilterParams(searchParams, allowedParams)
  const queryString = new URLSearchParams(filterParams).toString()
  return queryString
}
