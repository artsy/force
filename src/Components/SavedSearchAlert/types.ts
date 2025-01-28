import type { PageOwnerType } from "@artsy/cohesion"

export interface SearchCriteriaAttributes {
  acquireable?: boolean | null
  additionalGeneIDs?: string[] | null
  artistID?: string | null
  artistIDs?: string[]
  artistSeriesIDs?: string[] | null
  atAuction?: boolean | null
  attributionClass?: string[] | null
  colors?: string[] | null
  dimensionRange?: string | null
  forSale?: boolean | null
  framed?: boolean | null
  height?: string | null
  inquireableOnly?: boolean | null
  locationCities?: string[] | null
  majorPeriods?: string[] | null
  materialsTerms?: string[] | null
  offerable?: boolean | null
  partnerIDs?: string[] | null
  priceRange?: string | null
  signed?: boolean | null
  sizes?: string[] | null
  width?: string | null
}

export type SearchCriteriaAttributeKeys = keyof SearchCriteriaAttributes

export interface SavedSearchEntityOwner {
  type: PageOwnerType
  slug: string
  id: string
  name: string | undefined
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

export interface SavedSearchAlertFormValues {
  name: string
  email: boolean
  push: boolean
  frequency: SavedSearchFrequency
  details: string
}

export interface HearFromArtsyAdvisorFormValues {
  hearFromArtsyAdvisor: boolean
  message: string
  phoneNumber: string
  phoneCountryCode: string
}

export interface SavedSearchAlertMutationResult {
  id?: string
}
