import { Metric } from "Utils/metrics"

/**
 * A list of filters that support multiple selections
 */
export interface MultiSelectArtworkFilters {
  attributionClass?: string[]
  artistIDs?: string[]
  artistSeriesIDs?: string[]
  colors?: string[]
  additionalGeneIDs?: string[]
  majorPeriods?: string[]
  partnerIDs?: string[]
  sizes?: string[]
  locationCities?: string[]
  artistNationalities?: string[]
  materialsTerms?: string[]
}

/**
 * A list of all possible artwork filters across all apps
 */
export interface ArtworkFilters extends MultiSelectArtworkFilters {
  acquireable?: boolean
  artist_id?: string
  atAuction?: boolean
  color?: string
  forSale?: boolean
  height?: string
  includeArtworksByFollowedArtists?: boolean
  inquireableOnly?: boolean
  keyword?: string
  medium?: string
  offerable?: boolean
  page?: number
  partnerID?: string
  priceRange?: string
  sort?: string
  term?: string
  width?: string
  metric?: Metric
}
