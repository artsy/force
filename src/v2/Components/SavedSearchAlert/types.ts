export interface SearchCriteriaAttributes {
  artistID?: string | null
  artistIDs?: string[] | null
  locationCities?: string[] | null
  colors?: string[] | null
  partnerIDs?: string[] | null
  additionalGeneIDs?: string[] | null
  attributionClass?: string[] | null
  majorPeriods?: string[] | null
  acquireable?: boolean | null
  atAuction?: boolean | null
  inquireableOnly?: boolean | null
  offerable?: boolean | null
  dimensionRange?: string | null
  height?: string | null
  width?: string | null
  materialsTerms?: string[] | null
  priceRange?: string | null
}

export interface SavedSearchEntity {
  // possible entity types for creating alert
  type: "artist"
  id: string
  name: string
  slug: string
}

export type SearchCriteriaAttributeKeys = keyof SearchCriteriaAttributes

export interface DefaultFilterPill {
  isDefault: true
  name: string
  displayName: string
}

export interface NonDefaultFilterPill {
  isDefault?: false
  name: string
  displayName: string
  filterName: string
}

export type FilterPill = DefaultFilterPill | NonDefaultFilterPill

export interface SavedSearchAleftFormValues {
  name: string
  email: boolean
  push: boolean
}

export interface SavedSearchAlertMutationResult {
  id: string
}
