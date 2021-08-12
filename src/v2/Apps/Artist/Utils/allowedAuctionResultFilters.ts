export const allowedAuctionResultFilters = (
  filterParams: Record<string, any> = {}
): Record<string, any> => {
  return Object.keys(filterParams).reduce((obj, key) => {
    // Filter out unsupported arguments
    if (!SUPPORTED_INPUT_ARGS.includes(key)) {
      return obj
    }

    // Coerce integers
    if (INTEGER_INPUT_ARGS.includes(key)) {
      obj[key] = parseInt(filterParams[key], 10) || 1
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

const INTEGER_INPUT_ARGS = ["createdAfterYear", "createdBeforeYear"]

const BOOLEAN_INPUT_ARGS = ["allowEmptyCreatedDates"]

/**
 * This corresponds to all the allowed inputs to the filtered artworks connection.
 * This can be used as an allow-list when passing filter state from a URL.
 */
const SUPPORTED_INPUT_ARGS = ["organizations", "categories", "sizes"]
