import { string as yupString } from "yup"

export const allowedFilters = (
  filterParams: Record<string, any> = {}
): Record<string, any> => {
  return Object.keys(filterParams).reduce((obj, key) => {
    // Filter out unsupported arguments
    if (!SUPPORTED_INPUT_ARGS.includes(key)) {
      return obj
    }

    // Validate against schema-based inputs; if invalid, omit so defaults apply.
    if (key in SCHEMA_INPUT_ARGS) {
      const schema = SCHEMA_INPUT_ARGS[key]
      const value = String(filterParams[key])
      const isValid = schema.isValidSync(value)
      if (!isValid) return obj
      obj[key] = value
      return obj
    }

    // Coerce integers
    if (INTEGER_INPUT_ARGS.includes(key)) {
      obj[key] = Number.parseInt(filterParams[key], 10) || 1
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

const INTEGER_INPUT_ARGS = ["first", "last", "page", "size"]

const BOOLEAN_INPUT_ARGS = [
  "acquireable",
  "atAuction",
  "forSale",
  "framed",
  "includeArtworksByFollowedArtists",
  "includeMediumFilterInAggregation",
  "inquireableOnly",
  "keywordMatchExact",
  "marketable",
  "offerable",
  "signed",
]

/**
 * This corresponds to all the allowed inputs to the filtered artworks connection.
 * This can be used as an allow-list when passing filter state from a URL.
 */
const SUPPORTED_INPUT_ARGS = [
  "acquireable",
  "additionalGeneIDs",
  "after",
  "aggregationPartnerCities",
  "aggregations",
  "artistID",
  "artistIDs",
  "artistNationalities",
  "artistSeriesID",
  "artistSeriesIDs",
  "atAuction",
  "attributionClass",
  "before",
  "color",
  "colors",
  "dimensionRange",
  "excludeArtworkIDs",
  "extraAggregationGeneIDs",
  "first",
  "forSale",
  "framed",
  "geneID",
  "geneIDs",
  "height",
  "includeArtworksByFollowedArtists",
  "includeMediumFilterInAggregation",
  "inquireableOnly",
  "keyword",
  "keywordMatchExact",
  "last",
  "locationCities",
  "majorPeriods",
  "marketable",
  "materialsTerms",
  "medium",
  "offerable",
  "page",
  "partnerCities",
  "partnerID",
  "partnerIDs",
  "period",
  "periods",
  "priceRange",
  "saleID",
  "signed",
  "size",
  "sizes",
  "sort",
  "tagID",
  "width",
]

// Known, supported artwork sort values across filter contexts.
// If a new sort is introduced in the UI/backend, add it here.
const ALLOWED_SORTS = [
  "-decayed_merch",
  "-has_price,-prices",
  "-has_price,prices",
  "-partner_updated_at",
  "-published_at",
  "year",
  "-year",
  "partner_show_position",
  "sale_position",
]

const SORT_SCHEMA = yupString().oneOf(ALLOWED_SORTS)

/**
 * Inputs that require schema validation (string enums, complex patterns, etc.)
 * Add new entries here to validate and coerce additional fields.
 */
const SCHEMA_INPUT_ARGS: Record<string, ReturnType<typeof yupString>> = {
  sort: SORT_SCHEMA,
}
