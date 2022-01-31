import { SearchCriteriaAttributes } from "v2/__generated__/createSavedSearchAlertMutation.graphql"

export interface SavedSearchAttributes {
  // possible entity types for creating alert
  type: "artist"
  id: string
  name: string
  slug: string
}

export type SearchCriteriaAttributeKeys = keyof SearchCriteriaAttributes
