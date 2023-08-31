export const allowedAuctionResultFilters = (
  filterParams: Record<string, string | boolean> = {}
): Record<string, string> => {
  return Object.keys(filterParams).reduce((obj, key) => {
    // Filter out unsupported arguments
    if (!SUPPORTED_INPUT_ARGS.includes(key)) {
      return obj
    }

    // Coerce integers
    if (INTEGER_INPUT_ARGS.includes(key)) {
      obj[key] = parseInt(filterParams[key] as string, 10) || 1
      return obj
    }

    // Coerce booleans
    if (BOOLEAN_INPUT_ARGS.includes(key)) {
      const value = filterParams[key]
      obj[key] = value === "true" || value === true
      return obj
    }

    obj[key] = filterParams[key]
    return obj
  }, {})
}

const INTEGER_INPUT_ARGS = ["createdAfterYear", "createdBeforeYear", "page"]
const BOOLEAN_INPUT_ARGS = [
  "allowEmptyCreatedDates",
  "hideUpcoming",
  "includeEstimateRange",
  "includeUnknownPrices",
  "allowUnspecifiedSaleDates",
]
const SUPPORTED_INPUT_ARGS = [
  "organizations",
  "categories",
  "sizes",
  "metric",
  "hideUpcoming",
  "page",
  "priceRange",
  "currency",
  "allowEmptyCreatedDates",
  "includeEstimateRange",
  "includeUnknownPrices",
  "allowUnspecifiedSaleDates",
]
