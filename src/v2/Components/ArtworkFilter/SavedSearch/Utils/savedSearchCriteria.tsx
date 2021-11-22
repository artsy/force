import { SearchCriteriaAttributes } from "v2/__generated__/createSavedSearchAlertMutation.graphql"
import { ArtworkFilters } from "../../ArtworkFilterContext"
import { allowedSearchCriteriaKeys } from "./constants"

export const getAllowedFiltersForSavedSearchInput = (
  filters: ArtworkFilters
) => {
  const allowedFilters: SearchCriteriaAttributes = {}

  Object.keys(filters).forEach(filterKey => {
    if (allowedSearchCriteriaKeys.includes(filterKey)) {
      allowedFilters[filterKey] = filters[filterKey]
    }
  })

  return allowedFilters
}

export const getSearchCriteriaFromFilters = (
  artistID: string,
  filters: ArtworkFilters
) => {
  const input = getAllowedFiltersForSavedSearchInput(filters)
  const criteria: SearchCriteriaAttributes = {
    artistID,
    ...input,
  }

  return criteria
}
