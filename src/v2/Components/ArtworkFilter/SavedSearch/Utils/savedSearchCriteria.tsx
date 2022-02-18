import { SearchCriteriaAttributes } from "v2/__generated__/createSavedSearchAlertMutation.graphql"
import {
  ArtworkFiltersState,
  initialArtworkFilterState,
} from "../../ArtworkFilterContext"
import { allowedSearchCriteriaKeys } from "./constants"

export const isDefaultValue = (
  paramName: string,
  paramValue: string | boolean | string[] | null
) => {
  if (Array.isArray(paramValue)) {
    return paramValue.length === 0
  }

  if (paramValue === null) {
    return true
  }

  return initialArtworkFilterState[paramName] === paramValue
}

export const getAllowedSearchCriteria = (
  criteria: SearchCriteriaAttributes
) => {
  const allowedCriteria: SearchCriteriaAttributes = {}

  Object.entries(criteria).forEach(entry => {
    const [key, value] = entry
    const isAllowedKey = allowedSearchCriteriaKeys.includes(key)

    if (isAllowedKey && !isDefaultValue(key, value)) {
      allowedCriteria[key] = criteria[key]
    }
  })

  return allowedCriteria
}

export const getSearchCriteriaFromFilters = (
  artistID: string,
  filters: ArtworkFiltersState
): SearchCriteriaAttributes => {
  const allowedFilters = getAllowedSearchCriteria(filters)

  return {
    artistIDs: [artistID],
    ...allowedFilters,
  }
}
