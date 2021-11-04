import { Aggregations } from "../ArtworkFilter/ArtworkFilterContext"

export interface SavedSearchAleftFormValues {
  name: string
  email: boolean
}

export interface SavedSearchAlertFormPropsBase {
  filters: any // TODO: set filters type
  aggregations: Aggregations
  artistId: string
  artistName: string
}

export interface SavedSearchAlertMutationResult {
  id: string
}

export interface SavedSearchAlertUserSettings {
  name: string
  email?: boolean
}
