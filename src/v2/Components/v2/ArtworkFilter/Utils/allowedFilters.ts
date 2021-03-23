export const allowedFilters = filterParams => {
  return Object.keys(filterParams)
    .filter(key => supportedInputArgs.includes(key))
    .reduce((obj, key) => {
      obj[key] = filterParams[key]
      return obj
    }, {})
}

// This corresponds to all the allowed inputs to the
// filtered artworks connection. This can be used as an
// allow-list when passing filter state from a URL.
const supportedInputArgs = [
  "acquireable",
  "additionalGeneIDs",
  "after",
  "aggregationPartnerCities",
  "aggregations",
  "artistID",
  "artistIDs",
  "artistNationalities",
  "artistSeriesID",
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
