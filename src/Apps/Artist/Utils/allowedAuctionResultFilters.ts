export const allowedAuctionResultFilters = (
  filterParams: Record<string, string | boolean> = {},
): Record<string, string> => {
  return Object.keys(filterParams).reduce((obj, key) => {
    // Filter out unsupported arguments
    if (!SUPPORTED_INPUT_ARGS.includes(key)) {
      return obj
    }

    // Coerce integers
    if (INTEGER_INPUT_ARGS.includes(key)) {
      const parsed = Number.parseInt(filterParams[key] as string, 10)

      // Only default to 1 for page, year fields should be omitted if invalid
      if (Number.isNaN(parsed)) {
        if (key === "page") {
          obj[key] = 1
        }
        // Year fields are omitted when invalid/empty
      } else {
        obj[key] = parsed
      }
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

const INTEGER_INPUT_ARGS = [
  "createdAfterYear",
  "createdBeforeYear",
  "saleStartYear",
  "saleEndYear",
  "page",
]
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
  "keyword",
  "sort",
  "metric",
  "hideUpcoming",
  "page",
  "priceRange",
  "currency",
  "createdAfterYear",
  "createdBeforeYear",
  "saleStartYear",
  "saleEndYear",
  "allowEmptyCreatedDates",
  "includeEstimateRange",
  "includeUnknownPrices",
  "allowUnspecifiedSaleDates",
]
