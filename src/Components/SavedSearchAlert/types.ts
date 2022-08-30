import { PageOwnerType } from "@artsy/cohesion"

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
  sizes?: string[] | null
}

export type SearchCriteriaAttributeKeys = keyof SearchCriteriaAttributes

export interface SavedSearchEntityOwner {
  type: PageOwnerType
  slug: string
  id: string
  name: string
}

export interface SavedSearchEntityCriteria {
  displayValue: string
  value: string | boolean
}

export type SavedSearchDefaultCriteria = {
  [key in keyof SearchCriteriaAttributes]:
    | SavedSearchEntityCriteria
    | SavedSearchEntityCriteria[]
}

export interface SavedSearchEntity {
  placeholder: string
  owner: SavedSearchEntityOwner
  defaultCriteria: SavedSearchDefaultCriteria
}

export type FilterPill = {
  isDefault?: boolean
  value: string
  displayValue: string
  field: string
}

export type SavedSearchFrequency = "daily" | "instant"

export interface SavedSearchAleftFormValues {
  name: string
  email: boolean
  push: boolean
  frequency: SavedSearchFrequency
}

export interface SavedSearchAlertMutationResult {
  id: string
}
