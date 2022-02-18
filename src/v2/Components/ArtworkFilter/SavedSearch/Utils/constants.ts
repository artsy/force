import { Slice } from "../../ArtworkFilterContext"

export const shouldExtractValueNamesFromAggregation = [
  "locationCities",
  "materialsTerms",
  "additionalGeneIDs",
  "partnerIDs",
]

export const aggregationNameFromFilter: Record<string, Slice | undefined> = {
  locationCities: "LOCATION_CITY",
  materialsTerms: "MATERIALS_TERMS",
  additionalGeneIDs: "MEDIUM",
  partnerIDs: "PARTNER",
}

export const allowedSearchCriteriaKeys = [
  "artistID",
  "artistIDs",
  "locationCities",
  "colors",
  "partnerIDs",
  "additionalGeneIDs",
  "attributionClass",
  "majorPeriods",
  "acquireable",
  "atAuction",
  "inquireableOnly",
  "offerable",
  "materialsTerms",
  "priceRange",
  "sizes",
  "height",
  "width",
]
