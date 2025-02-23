import type { Slice } from "Components/ArtworkFilter/ArtworkFilterContext"
import type { SavedSearchFrequency } from "./types"

export const shouldExtractValueNamesFromAggregation = [
  "additionalGeneIDs",
  "artistIDs",
  "artistNationalities",
  "artistSeriesIDs",
  "locationCities",
  "materialsTerms",
  "partnerIDs",
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
  "acquireable",
  "additionalGeneIDs",
  "artistID",
  "artistIDs",
  "artistNationalities",
  "artistSeriesIDs",
  "atAuction",
  "attributionClass",
  "colors",
  "forSale",
  "framed",
  "height",
  "includeArtworksByFollowedArtists",
  "inquireableOnly",
  "locationCities",
  "majorPeriods",
  "materialsTerms",
  "offerable",
  "partnerIDs",
  "priceRange",
  "signed",
  "sizes",
  "width",
]

export const DEFAULT_FREQUENCY: SavedSearchFrequency = "daily"
