import {
  DEFAULT_HYBRID_WEIGHTS,
  parseHybridWeights,
} from "Components/HybridWeights/constants"
import { string as yupString } from "yup"

export const allowedFilters = (
  filterParams: Record<string, any> = {},
): Record<string, any> => {
  const allowed = Object.keys(filterParams).reduce((obj, key) => {
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

    // Coerce strings (query-string parsing may turn numeric-looking values
    // like "2010" into numbers, so ensure string-typed inputs stay strings).
    // Skip absent values — String(undefined) === "undefined" would otherwise
    // filter by the literal keyword "undefined" and return no results.
    if (STRING_INPUT_ARGS.includes(key)) {
      const value = filterParams[key]
      if (value == null) return obj
      obj[key] = String(value)
      return obj
    }

    obj[key] = filterParams[key]
    return obj
  }, {})

  return applyHybridStrategy(allowed)
}

/**
 * The `hybrid` toggle has no dedicated connection arg; it maps to `variant: "hybrid"`.
 * `hybridWeights` is only meaningful (and only passed) while hybrid is enabled, and the
 * connection expects a `[Float!]` array rather than the stored `"0.3-0.7"` string.
 */
const applyHybridStrategy = (
  filters: Record<string, any>,
): Record<string, any> => {
  const { hybrid, hybridWeights, ...rest } = filters

  if (hybrid !== true) {
    return rest
  }

  return {
    ...rest,
    variant: "hybrid",
    hybridWeights: parseHybridWeights(
      typeof hybridWeights === "string" ? hybridWeights : DEFAULT_HYBRID_WEIGHTS,
    ),
  }
}

const INTEGER_INPUT_ARGS = ["first", "last", "page", "size"]

const STRING_INPUT_ARGS = ["keyword", "period"]

const BOOLEAN_INPUT_ARGS = [
  "acquireable",
  "atAuction",
  "forSale",
  "framed",
  "hybrid",
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
  "hybrid",
  "hybridWeights",
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
  "-sale_position",
  "bidder_positions_count",
  "-bidder_positions_count",
  "prices",
  "-prices",
]

const SORT_SCHEMA = yupString().oneOf(ALLOWED_SORTS)

/**
 * Inputs that require schema validation (string enums, complex patterns, etc.)
 * Add new entries here to validate and coerce additional fields.
 */
const SCHEMA_INPUT_ARGS: Record<string, ReturnType<typeof yupString>> = {
  sort: SORT_SCHEMA,
}
