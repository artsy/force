import { SearchCriteriaAttributes } from "v2/__generated__/createSavedSearchAlertMutation.graphql"
import {
  ArtworkFiltersState,
  initialArtworkFilterState,
} from "../../ArtworkFilterContext"
import { allowedSearchCriteriaKeys } from "./constants"

export const getAllowedSearchCriteria = (
  criteria: SearchCriteriaAttributes
) => {
  const allowedCriteria: SearchCriteriaAttributes = {}

  Object.keys(criteria).forEach(filterKey => {
    if (allowedSearchCriteriaKeys.includes(filterKey)) {
      allowedCriteria[filterKey] = criteria[filterKey]
    }
  })

  return allowedCriteria
}

const isDefaultValue = (paramName, paramValue) => {
  if (Array.isArray(paramValue)) {
    return !paramValue.length
  }
  return initialArtworkFilterState[paramName] === paramValue
}

export const getSearchCriteriaFromFilters = (
  artistID: string,
  filters: ArtworkFiltersState
) => {
  const allowedFilters = getAllowedSearchCriteria(filters)

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
