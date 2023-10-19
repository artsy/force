export const allowedFilters = (
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

const INTEGER_INPUT_ARGS = ["first", "last", "page", "size"]

const BOOLEAN_INPUT_ARGS = [
  "acquireable",
  "atAuction",
  "forSale",
  "includeArtworksByFollowedArtists",
  "includeMediumFilterInAggregation",
  "inquireableOnly",
  "keywordMatchExact",
  "marketable",
  "offerable",
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
  "size",
  "sizes",
  "sort",
  "tagID",
  "width",
]
