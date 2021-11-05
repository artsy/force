import {
  Aggregations,
  ArtworkFilters,
} from "../ArtworkFilter/ArtworkFilterContext"

export interface SavedSearchAleftFormValues {
  name: string
  email: boolean
}

export interface SavedSearchAlertFormPropsBase {
  filters: ArtworkFilters
  aggregations: Aggregations
  artistId: string
  artistName: string
}

export interface SavedSearchAlertMutationResult {
  id: string
}

export interface SavedSearchAlertUserAlertSettings {
  name: string
  email?: boolean
}
