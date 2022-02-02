import { SearchCriteriaAttributes } from "v2/__generated__/createSavedSearchAlertMutation.graphql"
import {
  ArtworkFilters,
  initialArtworkFilterState,
} from "../../ArtworkFilterContext"
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

const isDefaultValue = (paramName, paramValue) => {
  if (Array.isArray(paramValue)) {
    return !paramValue.length
  }
  return initialArtworkFilterState[paramName] === paramValue
}

export const getSearchCriteriaFromFilters = (
  artistID: string,
  filters: ArtworkFilters
) => {
  const allowedFilters = getAllowedFiltersForSavedSearchInput(filters)

  const input = Object.entries(allowedFilters).reduce(
    (acc, [paramName, paramValue]) => {
      if (!isDefaultValue(paramName, paramValue)) {
        acc[paramName] = paramValue
      }
      return acc
    },
    {}
  )

  const criteria: SearchCriteriaAttributes = {
    artistIDs: [artistID],
    ...input,
  }

  return criteria
}
