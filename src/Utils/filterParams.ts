import qs from "qs"

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
  "hide_upcoming",
  "created_after_year",
  "created_before_year",
  "allow_empty_created_dates",
  "price_range",
  "currency",
  "include_estimate_range",
  "include_unknown_prices",
  "sale_start_year",
  "sale_end_year",
  "allow_unspecified_sale_dates",
] as const

export const ARTWORK_FILTER_PARAMS = [
  "sort",
  "medium",
  "price_range",
  "sizes",
  "colors",
  "keyword",
  "term",
  "attribution_class",
  "artist_ids",
  "artist_series_ids",
  "additional_gene_ids",
  "major_periods",
  "partner_ids",
  "location_cities",
  "artist_nationalities",
  "materials_terms",
  "acquireable",
  "at_auction",
  "for_sale",
  "framed",
  "height",
  "width",
  "inquireable_only",
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
 * Handles array parameters like attribution_class[0] by normalizing them.
 */
export function getFilterParams(
  searchParams: URLSearchParams,
  allowedParams: readonly string[] = ALL_FILTER_PARAMS,
): Record<string, string> {
  const queryString = searchParams.toString()
  const parsed = qs.parse(queryString) as Record<string, any>

  const filteredParams: Record<string, string> = {}

  for (const [key, value] of Object.entries(parsed)) {
    if (!allowedParams.includes(key as any)) continue
    if (!value || (typeof value === "string" && !value.trim())) continue

    if (Array.isArray(value)) {
      // Convert array params to normalized string representation
      // (ex., key[0]=Foo&key[1]=Bar becomes key=Bar,Foo)
      const sortedValues = [...value].sort()
      filteredParams[key] = sortedValues.join(",")
    } else if (typeof value === "string") {
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
