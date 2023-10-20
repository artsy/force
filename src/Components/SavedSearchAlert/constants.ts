import { Slice } from "Components/ArtworkFilter/ArtworkFilterContext"
import { SavedSearchFrequency } from "./types"

export const shouldExtractValueNamesFromAggregation = [
  "locationCities",
  "materialsTerms",
  "additionalGeneIDs",
  "partnerIDs",
  "artistIDs",
  "artistSeriesIDs",
  "artistNationalities",
]

export const aggregationNameFromFilter: Record<string, Slice> = {
  locationCities: "LOCATION_CITY",
  materialsTerms: "MATERIALS_TERMS",
  additionalGeneIDs: "MEDIUM",
  partnerIDs: "PARTNER",
  artistIDs: "ARTIST",
  artistSeriesIDs: "ARTIST_SERIES",
  artistNationalities: "ARTIST_NATIONALITY",
}

export const allowedSearchCriteriaKeys = [
  "artistID",
  "artistIDs",
  "artistSeriesIDs",
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
  "artistNationalities",
]

export const DEFAULT_FREQUENCY: SavedSearchFrequency = "daily"
